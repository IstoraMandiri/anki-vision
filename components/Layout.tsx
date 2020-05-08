import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

const PageLayout = ({ children }) => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Content
        style={{
          margin: "10px 10px 0 10px",
          minHeight: "100%",
          position: "relative",
        }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center", padding: "10px" }}>Fork this on Github</Footer>
    </Layout>
  );
};

export default PageLayout;
