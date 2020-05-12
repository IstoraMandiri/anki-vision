import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";

const App = () => (
  <Layout>
    <Dashboard />
  </Layout>
);

// import testState from "../utils/test.json";
// import GraphRenderer from "../components/GraphRenderer";
// const { all, months } = testState;

// const App = () => (
//   <Layout>
//     <GraphRenderer state={months} actions={{}} />
//   </Layout>
// );

export default App;
