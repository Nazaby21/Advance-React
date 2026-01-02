import React, { useState } from "react";
import {
  DashboardOutlined,
  FolderOpenOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Typography, Space, Dropdown } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/admin", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "/admin/projects", icon: <FolderOpenOutlined />, label: "Projects" },
    { key: "/admin/skills", icon: <AppstoreOutlined />, label: "Skills" },
    { key: "/admin/profile", icon: <UserOutlined />, label: "Profile" },
    { key: "/admin/settings", icon: <SettingOutlined />, label: "Settings" },
  ];

  const userMenuItems = [
    { key: "profile", label: "My Profile" },
    { key: "logout", label: "Logout" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 64,
            color: "#fff",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {collapsed ? "ADM" : "Portfolio Admin"}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Admin Panel
          </Title>

          <Dropdown menu={{ items: userMenuItems }}>
            <Space style={{ cursor: "pointer" }}>
              <Avatar icon={<UserOutlined />} />
              <Text strong>Admin</Text>
            </Space>
          </Dropdown>
        </Header>

        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
