const Json = (props) => {
  return (
    <pre style={{ textAlign: "left" }}>{JSON.stringify(props.children || props, null, 2)}</pre>
  );
};

export default Json;
