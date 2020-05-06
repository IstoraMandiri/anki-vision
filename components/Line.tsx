import { ResponsiveLine as RL } from '@nivo/line'
import { TableTooltip } from '@nivo/tooltip'
import Json from './Json'

const ResponsiveLine: any = RL

const MyResponsiveLine = ({ data }) => (
  <div style={{ height: '500px' }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 10, bottom: 50, left: 60 }}
      // xScale={{ type: 'point' }}
      // yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
      axisTop={null}
      axisRight={null}
      // curve="basis"
      axisBottom={{
        orient: 'bottom',
        // tickSize: 5,
        // tickPadding: 5,
        tickRotation: 90
      }}
      axisLeft={{
        orient: 'left',
        // tickSize: 5,
        // tickPadding: 5,
        tickRotation: 0,
        legend: 'Revisions',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      // toolTipFormat={() => 'hello'}
      sliceTooltip={({ slice }) => (
        <TableTooltip
          rows={slice.points.filter(p => p.data.y > 0).sort((a, b) => b.data.y - a.data.y).map(point => [
            <span style={{ display: 'block', width: '12px', height: '12px', background: point.serieColor }} key="chip" color={point.serieColor} />,
            point.serieId,
            <strong key="value">{point.data.yFormatted}</strong>
          ])}
        />
      )}
      enableArea={true}
      animate={false}
      enablePoints={false}
      // useMesh={true}
      enableSlices={'x'}
      // colors={{ scheme: 'nivo' }}
      // pointSize={10}
      // pointColor={{ theme: 'background' }}
      // pointBorderWidth={2}
      // pointBorderColor={{ from: 'serieColor' }}
      // pointLabel="y"
      // pointLabelYOffset={-12}
    />
    <Json data={data} />
  </div>
)

export default MyResponsiveLine
