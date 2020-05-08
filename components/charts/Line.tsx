import { ResponsiveLine as RL } from "@nivo/line";
import { TableTooltip } from "@nivo/tooltip";

const ResponsiveLine: any = RL;

const Line = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 10, right: 10, bottom: 50, left: 100 }}
    axisTop={null}
    axisRight={null}
    curve="basis"
    axisBottom={{
      orient: "bottom",
      tickRotation: 90,
      tickValues: data[0].data.map((d, i) => (i % 20 === 0 ? d.x : "")),
    }}
    axisLeft={{
      orient: "left",
      tickRotation: 0,
      legend: "Revisions",
      legendOffset: -80,
      legendPosition: "middle",
    }}
    sliceTooltip={({ slice }) => (
      <TableTooltip
        rows={slice.points
          .filter((p) => p.data.y > 0)
          .sort((a, b) => b.data.y - a.data.y)
          .map((point) => [
            <span
              style={{
                display: "block",
                width: "12px",
                height: "12px",
                background: point.serieColor,
              }}
              key="chip"
              color={point.serieColor}
            />,
            point.serieId,
            <strong key="value">{point.data.yFormatted}</strong>,
          ])}
      />
    )}
    enableGridX={false}
    enableGridY={false}
    animate={false}
    enableArea={true}
    enablePoints={false}
    enableSlices={"x"}
  />
);

export default Line;
