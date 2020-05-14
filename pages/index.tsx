import Head from "next/head";
import Dashboard from "../components/Dashboard";

const App = () => (
  <>
    <Head>
      <title>Anki.Vision</title>
    </Head>
    <Dashboard />
  </>
);

// FOR TESTING...
// import Layout from "../components/Layout";
// import Pie from "../components/charts/Pie";
// import Wrapper from "../components/Wrapper";

// import data from "../utils/pie.json";

// const Test = () => (
//   <Layout>
//     <div style={{ height: "700px" }}>
//       <Pie {...data} />
//     </div>
//   </Layout>
// );

export default App;
