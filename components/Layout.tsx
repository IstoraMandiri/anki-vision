import { Layout } from "antd";
import Footer from "./Footer";

const PageLayout = ({ children }) => {
  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Layout.Content
        style={{
          margin: "10px 10px 0 10px",
          minHeight: "100%",
          position: "relative",
        }}
      >
        {children}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: "center", padding: "10px" }}>
        <Footer />
      </Layout.Footer>
    </Layout>
  );
};

export default PageLayout;
