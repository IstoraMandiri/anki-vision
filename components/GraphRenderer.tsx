import useGraphs from '../hooks/graphs'
import DropdownSelect from './Dropdown'
import Json from './Json'

const GraphRenderer = ({ state }) => {
  const [{ Comp, data, type, graphTypes }, setGraph] = useGraphs(state)
  return (
    <>
      <div>
        <div style={{ float: 'right' }}>TODO - Presets!</div>
        <DropdownSelect items={graphTypes} selected={type} onChange={(type) => setGraph({ type })} />
        {data && <Comp data={data} />}
        <Json data={data} />
      </div>
    </>
  )
}

export default GraphRenderer
