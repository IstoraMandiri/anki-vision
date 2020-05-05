import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({ data }) => (
  <div style={{ height: '500px' }}>
    <ResponsiveLine
      data={data}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    />
  </div>
)

export default MyResponsiveLine
