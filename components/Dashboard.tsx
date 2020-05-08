import { Spin } from "antd";

import Json from "./Json";
import useQueryBuilder from "../hooks/query";
import BuildQuery from "./BuildQuery";
import GraphRenderer from "./GraphRenderer";

import FileImport from "./FileImport";
import Welcome from "./Welcome";
import Wrapper from "./Wrapper";

const Dashboard = () => {
  const [state, actions] = useQueryBuilder();
  if (!state.orm.loading && !state.orm.ready) {
    return (
      <Wrapper>
        <Welcome>
          <FileImport onChange={actions.handleFileSelect} />
        </Welcome>
      </Wrapper>
    );
  }
  if (state.info.loading) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }
  return (
    <>
      <GraphRenderer state={state} actions={actions} />
      {/* <Json state={state} /> */}
    </>
  );
};

export default Dashboard;
