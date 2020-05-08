import Json from "./Json";
import useQueryBuilder from "../hooks/query";
import BuildQuery from "./BuildQuery";
import GraphRenderer from "./GraphRenderer";

import testState from "../utils/test.json";
const { all, months } = testState;

const test = () => <GraphRenderer state={months} />;

const Dashboard = () => {
  const [state, actions] = useQueryBuilder();
  if (!state.orm.loading && !state.orm.ready) {
    return <input type="file" onChange={actions.handleFileSelect} />;
  }
  if (state.info.loading) {
    return <>Loading</>;
  }
  return (
    <>
      <div>
        <BuildQuery state={state} actions={actions} />
        <GraphRenderer state={state} />
        {/* <Json state={state} /> */}
      </div>
    </>
  );
};

export default Dashboard;

// export default test
