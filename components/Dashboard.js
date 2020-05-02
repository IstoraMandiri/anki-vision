
import Json from './Json'
import useQueryBuilder from '../hooks/queryBuilder'

const Dashboard = () => {
  const [{ info, query, result }, { handleFileSelect, updateQuery, runQuery }] = useQueryBuilder()
  return (
    <>
      <div>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={() => runQuery()}>Go!</button>
        <Json result={{ result, query, info }} />
      </div>
    </>
  )
}

export default Dashboard
