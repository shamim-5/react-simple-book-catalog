import { Layout, theme } from "antd";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import AppFooter from "./AppFooter";

const MainLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Navbar />

        <Content className="site-layout" style={{ padding: "0 50px" }}>
          <div style={{ minHeight: 380, background: colorBgContainer }} className="py-6 lg:py-12">
            <Outlet />
          </div>
        </Content>

        <AppFooter />
      </Layout>
    </>
  );
};

export default MainLayout;
