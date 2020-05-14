import { Spin } from "antd";

import Wrapper from "./Wrapper";
import GraphMenu from "./GraphMenu";
import Graph from "./Graph";
import Warning from "./Warning";
import Json from "./Json";
import CollectionInfo from "./CollectionInfo";

interface Props {
  state: QueryBuilderState;
  actions: QueryBuilderActions;
}

const GraphRenderer: React.FC<Props> = ({ state, actions }) => {
  const {
    result: { loading, error, period },
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
          <Comp data={data} graph={graph} period={period} />
        </Graph>
      )}
      {!loading && !error && !data && (
        <Wrapper>
          <CollectionInfo state={state} />
        </Wrapper>
      )}
      {/* <Json data={data} graph={graph} period={period} /> */}
    </>
  );
};

export default GraphRenderer;
