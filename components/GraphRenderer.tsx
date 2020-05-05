import Json from './Json'

import Line from './Line'

function transformData ({ query: { period }, data }) {
  return Object.keys(data[0]).reduce((a, id) => {
    return id === period ? a : [...a, { id, data: data.map(d => ({ x: d[period], y: d[id] })) }]
  }, [])
}

const GraphRenderer = ({ state, actions }) => {
  const { result } = state
  if (!result.ready) { return null }
  const data = transformData(result)
  return (
    <>
      <div>
        I am a graph GraphRenderer
        <Line data={data} />
        <Json res={state.result} data={data} />
      </div>
    </>
  )
}

export default GraphRenderer
