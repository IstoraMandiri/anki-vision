import useGraphs from "../hooks/graphs";
import Wrapper from "./Wrapper";
import GraphMenu from "./GraphMenu";
import Json from "./Json";
import { Spin } from "antd";

const GraphRenderer = ({ state, actions }) => {
  const [graph, setGraph] = useGraphs(state);
  const { Comp } = graph;
  return (
    <>
      <GraphMenu {...{ graph, setGraph, state, actions }} />
      <div
        style={{
          zIndex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "white",
        }}
      >
        {state.result.loading && (
          <Wrapper>
            <Spin size="large" />
          </Wrapper>
        )}
        {graph.data && <Comp data={graph.data} />}
        {/* <Json data={state} /> */}
      </div>
    </>
  );
};

export default GraphRenderer;
