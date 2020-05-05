import { useState, useEffect } from 'react'
import tick from '../utils/tick'
import useOrm from './orm'
import { getCollectionInfo, getRevisions } from '../utils/queries'

const defaultQuery: Query = {
  period: 'month',
  select: { time: true },
  filter: {}
}

export default function useQuery (): [QueryBuilderState, QueryBuilderActions] {
  const [orm, { handleFileSelect }] = useOrm()
  const [info, setInfo] = useState({ loading: true, ready: false })
  const [query, setQuery] = useState(defaultQuery)
  const [result, setResult] = useState({ loading: false, ready: false } as Result)

  useEffect(() => {
    if (orm.ready) {
      (async () => {
        setInfo({ ...await initialize(), ready: true, loading: false })
      })()
    }
  }, [orm.ready])

  function updateQuery (update) {
    const { select, filter, period } = update
    setQuery({
      period: period || query.period,
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

    // if decks, noteTypes or tags are filtered, add them to selection...
    const transformed = { ...query };
    ['decks', 'noteTypes', 'tags'].forEach((k) => {
      if (query.select[k] && query.filter[k]) {
        transformed.select[k] = query.filter[k]
      }
    })
    console.log(query, transformed)
    const data = await getRevisions({ query, info })
    setResult({ loading: false, ready: true, data, query: transformed })
  }

  const actions = {
    handleFileSelect,
    updateQuery,
    runQuery
  }

  return [{ query, orm, info, result }, actions]
}
