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
        {!showMenu && <LeftSquareFilled onPointerEnter={() => setShowMenu(true)} />}
      </div>
      <GraphBuilder showMenu={showMenu} setShowMenu={setShowMenu} {...props} />
    </>
  );
};

export default GraphMenu;
