import { useState, useEffect } from 'react'
import useOrm from './orm'

export default function useQueryBuilder (): [any, QueryBuilderActions] {
  const [{ ready }, { handleFileSelect, getCollectionInfo, makeQuery }] = useOrm()
  const [options, setSetOptions] = useState({ ready: false })
  const [query, setQuery] = useState({ filter: {}, sort: {} })

  useEffect(() => {
    if (ready) {
      (async () => {
        setSetOptions({
          ready: true,
          ...await getCollectionInfo()
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

  async function runQuery () {
    makeQuery(query)
  }

  const actions = {
    handleFileSelect,
    updateQuery,
    runQuery
  }

  return [{ query, options }, actions]
}
