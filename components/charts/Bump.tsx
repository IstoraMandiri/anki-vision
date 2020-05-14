import { ResponsiveBump as RB } from "@nivo/bump";

const ResponsiveBump: any = RB;

const Bump = (props) => {
  const {
    data,
    period: { margin },
  } = props;
  const ticks = 20;
  const t = data.length < ticks ? 1 : Math.ceil(data.length / ticks);
  const length =
    data.reduce((a, b) => (a.id.length > b.id.length ? a : b)).id.length * 6;
  return (
    <ResponsiveBump
      data={data}
      margin={{ top: 10, right: length + 20, bottom: margin, left: 60 }}
      colors={{ scheme: "spectral" }}
      pointColor={{ theme: "background" }}
      pointBorderColor={{ from: "serie.color" }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickRotation: -45,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Rank",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      animate={false}
    />
  );
};

export default Bump;
