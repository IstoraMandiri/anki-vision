import { ResponsivePie } from "@nivo/pie";

const Pie = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      animate={false}
    />
  );
};

export default Pie;
