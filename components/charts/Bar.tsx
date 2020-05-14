import { ResponsiveBar } from "@nivo/bar";

const Bar = (props) => {
  const {
    data: { keys, data },
    period: { margin },
  } = props;
  const ticks = 20;
  const t = data.length < ticks ? 1 : Math.ceil(data.length / ticks);
  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="period"
      margin={{ top: 10, right: 10, bottom: margin, left: 100 }}
      enableLabel={false}
      colors={{ scheme: "spectral" }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: data.filter((d, i) => i % t === 1).map((d) => d.period),
        tickRotation: -45,
      }}
      axisLeft={{
        orient: "left",
        tickRotation: 0,
        legend: "Revisions",
        legendOffset: -80,
        legendPosition: "middle",
      }}
      animate={false}
    />
  );
};
export default Bar;
