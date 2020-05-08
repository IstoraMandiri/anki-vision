import { ResponsiveBar } from "@nivo/bar";

const Bar = ({ data: { keys, data } }) => (
  <div style={{ height: "500px" }}>
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy="period"
      margin={{ top: 10, right: 10, bottom: 100, left: 100 }}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: data.map((d, i) => (i % 20 === 0 ? d.period : "")),
        tickRotation: 90,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Revisions",
        legendPosition: "middle",
        legendOffset: -60,
      }}
      animate={false}
    />
  </div>
);

export default Bar;
