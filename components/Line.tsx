import { ResponsiveLine } from '@nivo/line'

const MyResponsiveLine = ({ data }) => (
  <div style={{ height: '500px' }}>
    <ResponsiveLine
      data={data}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      curve='natural'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'nivo' }}
      useMesh={true}
    />
  </div>
)

export default MyResponsiveLine
