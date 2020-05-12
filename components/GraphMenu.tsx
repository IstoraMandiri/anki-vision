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
          zIndex: 3,
          right: 0,
          top: 0,
          lineHeight: "1rem",
          opacity: "0.5",
        }}
      >
        {showMenu && <RightSquareFilled onClick={() => setShowMenu(false)} />}
        {!showMenu && <LeftSquareFilled onClick={() => setShowMenu(true)} />}
      </div>
      {showMenu && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            top: 15,
            right: 15,
            width: "500px",
            maxWidth: "90%",
            background: "rgba(255,255,255,.9)",
            border: "1px solid rgba(0,0,0,0.1)",
            maxHeight: "90%",
            overflowY: "scroll",
            padding: "10px",
          }}
        >
          <GraphBuilder setShowMenu={setShowMenu} {...props} />
        </div>
      )}
    </>
  );
};

export default GraphMenu;
