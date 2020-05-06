import Json from './Json'

import Line from './Line'

function transformData ({ data }) {
  return Object.keys(data[0]).reduce((a, id) => {
    let hasY = false
    const parsed = data.map(d => {
      if (d[id]) {
        hasY = true
      }
      return { x: d.period, y: d[id] }
    })
    return id === 'period' ? a : [...a, { id, hasY, data: parsed }]
  }, []).filter(d => d.hasY)
}

const GraphRenderer = ({ state }) => {
  const { result } = state
  if (!result.ready) { return null }
  if (!result.data.length) {
    return <>No Results</>
  }
  const data = transformData(result)
  return (
    <>
      <div>
        <Line data={data} />
      </div>
    </>
  )
}

export default GraphRenderer
