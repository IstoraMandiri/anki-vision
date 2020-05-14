import * as core from "@nivo/core";
import { ResponsiveLine } from "@nivo/line";
import { TableTooltip } from "@nivo/tooltip";
import { formatDate } from "../../utils/format";

const Line = (props) => {
  const {
    data,
    period: { format, tickValues, margin },
  } = props;
  const ticks = 20;
  const tickVals = data[0].data.length < ticks ? tickValues : ticks;
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 10, right: 10, bottom: margin, left: 100 }}
      axisTop={null}
      axisRight={null}
      curve="linear"
      colors={{ scheme: "spectral" }}
      enableGridX={false}
      enableGridY={false}
      animate={false}
      enableArea={true}
      enablePoints={false}
      enableSlices={"x"}
      xScale={{ type: "time", format: "native" }}
      axisBottom={{
        orient: "bottom",
        tickRotation: -45,
        format,
        tickValues: tickVals,
      }}
      axisLeft={{
        orient: "left",
        tickRotation: 0,
        legend: "Revisions",
        legendOffset: -80,
        legendPosition: "middle",
      }}
      sliceTooltip={({ slice }) => {
        return (
          <TableTooltip
            title={<b>{formatDate(format, slice.points[0].data.x)}</b>}
            rows={slice.points
              .filter((p) => p.data.y > 0)
              .sort((a, b) => (b.data.y as number) - (a.data.y as number))
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
        );
      }}
    />
  );
};

export default Line;
