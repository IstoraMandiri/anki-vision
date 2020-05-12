import { Spin } from "antd";

import Json from "./Json";
import useQueryBuilder from "../hooks/query";

import GraphRenderer from "./GraphRenderer";
import Layout from "./Layout";
import FileImport from "./FileImport";
import Welcome from "./Welcome";
import Wrapper from "./Wrapper";
import MainMenu from "./MainMenu";

const Dashboard = () => {
  const [state, actions] = useQueryBuilder();
  return (
    <>
      <MainMenu state={state} actions={actions} />
      <Layout>
        {(() => {
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
        })()}
      </Layout>
    </>
  );
};

export default Dashboard;
