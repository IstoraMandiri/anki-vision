import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import Wrapper from "./Wrapper";
import Warning from "./Warning";

const Graph = ({ error, type, children }) => {
  if (error) {
    return (
      <Wrapper>
        <Warning text={error} />
      </Wrapper>
    );
  }
  // add an artificial loading screen to allow UI to re-render
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [type]);
  if (loading) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }
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
      {children}
    </div>
  );
};

// only re-render if it's updating the error or graph type
export default React.memo(Graph, (prev, next) => {
  return prev.error === next.error && prev.type === next.type;
});
