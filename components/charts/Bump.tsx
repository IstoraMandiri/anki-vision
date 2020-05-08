import { ResponsiveBump as RB } from '@nivo/bump'

const ResponsiveBump: any = RB

const Bump = ({ data }) => (
  <div style={{ height: '500px' }}>
    <ResponsiveBump
      data={data}
      margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
      colors={{ scheme: 'spectral' }}
      lineWidth={3}
      activeLineWidth={6}
      inactiveLineWidth={3}
      inactiveOpacity={0.15}
      pointSize={10}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: 'serie.color' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'ranking',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      animate={false}
    />
  </div>
)

export default Bump
