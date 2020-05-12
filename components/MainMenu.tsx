import { DownSquareFilled, UpSquareFilled } from "@ant-design/icons";

import { useState } from "react";
import { Button } from "antd";

const MainMenu = ({ actions, state }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          left: 15,
          bottom: 15,
          lineHeight: "1rem",
          opacity: "0.5",
        }}
      >
        {showMenu && <DownSquareFilled onClick={() => setShowMenu(false)} />}
        {!showMenu && <UpSquareFilled onClick={() => setShowMenu(true)} />}
      </div>
      {showMenu && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            left: 30,
            bottom: 30,
            maxWidth: "90%",
            background: "rgba(255,255,255,.9)",
            border: "1px solid rgba(0,0,0,0.1)",
            maxHeight: "90%",
            overflowY: "scroll",
            padding: "10px",
          }}
        >
          <Button disabled>Dark Mode</Button>
          {state.orm.ready && (
            <Button
              onClick={() => {
                setShowMenu(false);
                actions.reset();
              }}
            >
              Reset
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default MainMenu;
