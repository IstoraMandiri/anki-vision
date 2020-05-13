import { Spin } from "antd";

import Wrapper from "./Wrapper";
import GraphMenu from "./GraphMenu";
import Graph from "./Graph";
import Warning from "./Warning";

const GraphRenderer = ({ state, actions }) => {
  const {
    result: { loading, error },
    Comp,
    data,
    graph,
  } = state;
  return (
    <>
      <GraphMenu {...{ state, actions }} />
      {loading && (
        <Wrapper>
          <Spin size="large" />
        </Wrapper>
      )}
      {!loading && error && (
        <Wrapper>
          <Warning text="Your query yielded no results. Please try something else." />
        </Wrapper>
      )}
      {!loading && !error && data && (
        <Graph error={data.error} type={graph.type}>
          <Comp data={data} />
        </Graph>
      )}
    </>
  );
};

export default GraphRenderer;
