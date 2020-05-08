import { LeftSquareFilled, RightSquareFilled } from "@ant-design/icons";

import GraphBuilder from "./GraphBuilder";

import { useState } from "react";

const GraphMenu = (props) => {
  const [showMenu, setShowMenu] = useState(true);
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          top: 10,
          right: 10,
          maxWidth: "50%",
          background: "rgba(255,255,255,.8)",
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ position: "absolute", right: 0, top: 0, lineHeight: "1rem", opacity: "0.5" }}>
          {showMenu && <RightSquareFilled onClick={() => setShowMenu(false)} />}
          {!showMenu && <LeftSquareFilled onClick={() => setShowMenu(true)} />}
        </div>
        {showMenu && (
          <div style={{ margin: "10px" }}>
            <GraphBuilder {...props} />
          </div>
        )}
      </div>
    </>
  );
};

export default GraphMenu;
