import { useState, useEffect } from 'react'
import tick from '../utils/tick'
import useOrm from './orm'
import { getCollectionInfo, getRevisions } from '../utils/queries'

const sampleQuery = {
  filter: {
    decks: { 1: true }
  },
  count: {
    wrong: 'value'
  },
  period: 'year',
  sort: {}
}

export default function useQueryBuilder (): [QueryBuilderState, QueryBuilderActions] {
  const [{ ready }, { handleFileSelect }] = useOrm()
  const [info, setInfo] = useState({ ready: false })
  const [query, setQuery] = useState(sampleQuery)
  const [result, setResult] = useState({ loading: false, ready: false } as Result)

  useEffect(() => {
    if (ready) {
      (async () => {
        setInfo({
          ready: true,
          ...await initialize()
        })
      })()
    }
  }, [ready])

  function updateQuery ({ type, field, id, value }) {
    setQuery({
      ...query,
      [type]: {
        ...query[type],
        [field]: {
          ...query[type][field],
          [id]: value
        }
      }
    })
  }

  async function initialize (): Promise<CollectionInfo> {
    return getCollectionInfo()
  }

  async function runQuery () {
    setResult({ ...result, loading: true, ready: false })
    await tick() // force it to re-render before blocking thread
    const data = await getRevisions(query)
    setResult({ loading: false, ready: true, data })
  }

  const actions = {
    handleFileSelect,
    updateQuery,
    runQuery
  }

  return [{ query, info, result }, actions]
}
