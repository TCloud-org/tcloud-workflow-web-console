import {
  CodeOutlined,
  HomeOutlined,
  MonitorOutlined,
  PartitionOutlined,
  SafetyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { BRAND } from "Config/WOSEndpointConfig";
import { Flex, Menu, MenuProps, Typography, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SiderHrefs = {
  home: "home",
  workflow: "workflow",
  security: "security",
  settings: "settings",
  monitor: "monitor",
  "/development": "/development",
  "/onboarding": "workflow",
  "/query": "workflow",
  "/live": "workflow",
  "/bucket": "workflow",
  "/graph": "workflow",
  "/service": "workflow",
  "/retry-policy": "workflow",
  "/auth-token": "security",
  "/general": "settings",
  "/billing": "settings",
  "/traffic": "monitor",
};

export const AppSider = () => {
  const { token } = theme.useToken();
  const { isDevMode } = useSelector((state: any) => state.general);
  const selectedKeys: string[] = useSelector(
    (state: any) => state.sider.selectedKeys
  );
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [currentOpenKeys, setCurrentOpenKeys] = useState<string[]>([]);

  const siderMenus: MenuProps["items"] = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      key: "workflow",
      icon: <PartitionOutlined />,
      label: "Workflow",
      children: [
        {
          key: "/onboarding",
          label: "Onboarding",
          onClick: () => navigate("/onboarding"),
        },
        {
          key: "/query",
          label: "Query",
          onClick: () => navigate("/query"),
        },
        {
          key: "/live",
          label: "Live",
          onClick: () => navigate("/live"),
        },
        {
          key: "/bucket",
          label: "Bucket",
          onClick: () => navigate("/bucket"),
        },
        {
          key: "/graph",
          label: "Graph",
          onClick: () => navigate("/graph"),
        },
        {
          key: "/service",
          label: "Service",
          onClick: () => navigate("/service"),
        },
        {
          key: "/retry-policy",
          label: "Retry Policy",
          onClick: () => navigate("/retry-policy"),
        },
      ],
    },
    {
      key: "monitor",
      icon: <MonitorOutlined />,
      label: "Monitor",
      children: [
        {
          key: "/traffic",
          label: "Traffic",
          onClick: () => navigate("/traffic"),
        },
      ],
    },
    {
      key: "security",
      icon: <SafetyOutlined />,
      label: "Security",
      children: [
        {
          key: "/auth-token",
          label: "Auth Token",
          onClick: () => navigate("/auth-token"),
        },
      ],
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          key: "/general",
          label: "General",
          onClick: () => navigate("/general"),
        },
        {
          key: "/billing",
          label: "Billing",
          onClick: () => navigate("/billing"),
        },
      ],
    },
    ...(isDevMode
      ? [
          {
            key: "/development",
            icon: <CodeOutlined />,
            label: "Development",
            onClick: () => navigate("/development"),
          },
        ]
      : []),
  ];

  useEffect(() => {
    if (selectedKeys) {
      setCurrentOpenKeys(
        selectedKeys.length > 0
          ? [SiderHrefs[selectedKeys[0].toString() as keyof typeof SiderHrefs]]
          : ["home"]
      );
    }
  }, [selectedKeys]);

  const onOpenKey = (openKeys: string[]) => {
    setCurrentOpenKeys(openKeys.slice(-1));
  };

  return (
    <Sider
      width={200}
      theme="dark"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <Flex justify="center" style={{ height: "64px" }} align="center">
        <Typography.Link
          style={{
            padding: "8px 0",
            margin: "0 16px",
            // backgroundColor: "#324553",
            flex: 1,
            textAlign: "center",
            borderRadius: token.borderRadiusLG,
          }}
          strong
          href="/"
        >
          {BRAND}
        </Typography.Link>
      </Flex>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedKeys}
        onOpenChange={onOpenKey}
        openKeys={currentOpenKeys}
        style={{ borderRight: 0 }}
        items={siderMenus}
      />
    </Sider>
  );
};
