import { useState, useEffect } from 'react'
import tick from '../utils/tick'
import useOrm from './orm'
import { getCollectionInfo, getRevisions } from '../utils/queries'

const sampleQuery = {
  select: {
    time: true
    // wrong: true
    // tags: true,
    // decks: true,
    // noteTypes: true
  },
  period: 'day'
}

export default function useQuery (): [QueryBuilderState, QueryBuilderActions] {
  const [orm, { handleFileSelect }] = useOrm()
  const [info, setInfo] = useState({ loading: true, ready: false })
  const [query, setQuery] = useState(sampleQuery as Query)
  const [result, setResult] = useState({ loading: false, ready: false } as Result)

  useEffect(() => {
    if (orm.ready) {
      (async () => {
        setInfo({ ...await initialize(), ready: true, loading: false })
      })()
    }
  }, [orm.ready])

  function updateQuery (update) {
    const { select, filter } = update
    setQuery({
      select: select || query.select,
      filter: { ...query.filter, ...filter }
    })
  }

  async function initialize (): Promise<CollectionInfo> {
    return getCollectionInfo()
  }

  async function runQuery () {
    setResult({ ...result, loading: true, ready: false })
    await tick() // force it to re-render before blocking thread
    const data = await getRevisions({ query, info })
    setResult({ loading: false, ready: true, data })
  }

  const actions = {
    handleFileSelect,
    updateQuery,
    runQuery
  }

  return [{ query, orm, info, result }, actions]
}
