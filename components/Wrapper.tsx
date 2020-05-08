const Wrapper = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    <div>{children}</div>
  </div>
);

export default Wrapper;
