import 'reflect-metadata'

import Json from '../components/Json'
import useQueryBuilder from '../hooks/queryBuilder'

export default function Home () {
  const [state, { handleFileSelect, updateQuery, runQuery }] = useQueryBuilder()
  return (
    <div className="container">
      <input type="file" onChange={handleFileSelect} />
      <button onClick={() => runQuery()}>Test</button>
      <Json>{state}</Json>
    </div>
  )
}
