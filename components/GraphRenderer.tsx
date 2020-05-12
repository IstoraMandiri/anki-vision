import { Spin } from "antd";
import useGraphs from "../hooks/graphs";
import Wrapper from "./Wrapper";
import GraphMenu from "./GraphMenu";
import Json from "./Json";
import Warning from "./Warning";

const GraphRenderer = ({ state, actions }) => {
  const [graph, setGraph] = useGraphs(state);
  const { Comp } = graph;
  return (
    <>
      <GraphMenu {...{ graph, setGraph, state, actions }} />
      {(() => {
        if (state.result.loading) {
          return (
            <Wrapper>
              <Spin size="large" />
            </Wrapper>
          );
        }
        if (state.result.error) {
          return (
            <Wrapper>
              <Warning text="Your query yielded no results. Please try something else." />
            </Wrapper>
          );
        }
        if (graph.data) {
          return (
            <div
              style={{
                zIndex: 1,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "white",
                userSelect: "none",
              }}
            >
              <Comp data={graph.data} />
            </div>
          );
        }
      })()}
    </>
  );
};

export default GraphRenderer;
