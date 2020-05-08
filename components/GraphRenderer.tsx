import useGraphs from "../hooks/graphs";
import { LeftSquareFilled, RightSquareFilled } from "@ant-design/icons";

import DropdownSelect from "./Dropdown";
import BuildQuery from "./BuildQuery";
import Wrapper from "./Wrapper";
import Json from "./Json";
import { useState } from "react";
import { Spin } from "antd";

const GraphRenderer = ({ state, actions }) => {
  const [{ Comp, data, type, graphTypes }, setGraph] = useGraphs(state);
  const [showMenu, setShowMenu] = useState(true);
  return (
    <>
      <div style={{ position: "absolute", zIndex: 2, top: 0, right: 0, maxWidth: "50%" }}>
        <div style={{ position: "absolute", right: 0, top: 0, lineHeight: "1rem", opacity: "0.5" }}>
          {showMenu && <RightSquareFilled onClick={() => setShowMenu(false)} />}
          {!showMenu && <LeftSquareFilled onClick={() => setShowMenu(true)} />}
        </div>
        {showMenu && (
          <div style={{ margin: "10px" }}>
            <BuildQuery state={state} actions={actions} />
            <DropdownSelect
              items={graphTypes}
              selected={type}
              onChange={(type) => setGraph({ type })}
            />
            TODO - Presets!
          </div>
        )}
      </div>
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
        {data && <Comp data={data} />}
        {/* <Json data={state} /> */}
      </div>
    </>
  );
};

export default GraphRenderer;
