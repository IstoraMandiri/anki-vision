const Json = (props) => (
  <pre>{JSON.stringify(props.children || props, null, 2)}</pre>
)

export default Json
