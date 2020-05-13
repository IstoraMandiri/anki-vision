const Json = (props) => {
  return (
    <pre
      style={{
        textAlign: "left",
        position: "absolute",
        top: 0,
        left: 0,
        overflowY: "scroll",
        width: "100px",
        height: "100px",
        zIndex: 20,
      }}
    >
      {JSON.stringify(props.children || props, null, 2)}
    </pre>
  );
};

export default Json;
