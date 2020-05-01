import { useSql } from '../hooks/sql'

import Heatmap from './Heatmap'
import Json from './Json'

const Dashboard = () => {
  const [state, { load }] = useSql()
  return (
    <>
      <div>
        <Heatmap data={state} />
        <input type="file" onChange={load} />
        <Json data={(state || []).slice(0, 30)} />
      </div>
    </>
  )
}

export default Dashboard
