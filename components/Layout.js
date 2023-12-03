"use client";

import React, { useState, useEffect } from "react";
import {
  DashboardOutlined,
  FileOutlined,
  UserOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Space, Button, Image } from "antd";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";

const { Header, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <Link href={"/dashboard"}>Dashboard</Link>,
    "/dashboard",
    <DashboardOutlined />
  ),
  getItem(
    <Link href={"/report"}>Report Injury</Link>,
    "/report",
    <FileOutlined />
  ),

  getItem(
    <Link href={"/analytics"}>Analytics</Link>,
    "/analytics",
    <BarChartOutlined />
  ),
  getItem(<Link href={"/profile"}>Profile</Link>, "5", <UserOutlined />),
];

const App = ({ children }) => {
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();
  const [selectedMenu, setSelectedMenu] = useState(pathname);

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelectedMenu = (e) => {
    setSelectedMenu(e.key);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[selectedMenu]}
          mode="inline"
          items={items}
          onClick={handleSelectedMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              padding: "0 24px",
              background: colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Logo</h1>
            {user ? (
              <Space>
                <span style={{ textTransform: "capitalize" }}>{user.name}</span>
                <Image
                  src={user.picture}
                  alt={user.name}
                  width={35}
                  height={35}
                />
                <Space>
                  <a href="/api/auth/logout">Logout</a>
                </Space>
              </Space>
            ) : (
              <Button>
                <a href="/api/auth/login">Login</a>
              </Button>
            )}
          </div>
        </Header>
        {children}
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
