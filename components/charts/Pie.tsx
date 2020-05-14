import { ResponsivePie } from "@nivo/pie";

const Pie = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 150, right: 150, bottom: 150, left: 150 }}
      animate={false}
      colors={{ scheme: "spectral" }}
      innerRadius={0.2}
      padAngle={0.7}
      startAngle={-55}
      cornerRadius={8}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={5}
      radialLabelsTextXOffset={6}
      radialLabelsTextColor="#333333"
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={16}
      radialLabelsLinkHorizontalLength={24}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: "color" }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor="#333333"
    />
  );
};

export default Pie;
