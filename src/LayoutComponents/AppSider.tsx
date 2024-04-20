import {
  ApiOutlined,
  CodeOutlined,
  HomeOutlined,
  MonitorOutlined,
  PartitionOutlined,
  SafetyOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { SiderWidth } from "Config/LayoutConfig";
import { Menu, MenuProps, theme } from "antd";
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
  "/workflow-automation": "/workflow-automation",
  "/development": "/development",
  "/api-workflow-introduction": "workflow",
  "/api-workflow-onboarding": "workflow",
  "/api-workflow-quickstart": "workflow",
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

export const SiderName = {
  "/workflow-automation": "Workflow Automation",
  "/development": "Development",
  "/api-workflow-introduction": "Introduction",
  "/api-workflow-onboarding": "Onboarding",
  "/api-workflow-quickstart": "Quickstart",
  "/query": "Query",
  "/live": "Live",
  "/bucket": "Bucket",
  "/graph": "Graph",
  "/service": "Service",
  "/retry-policy": "Retry Policy",
  "/auth-token": "Auth Token",
  "/general": "General",
  "/billing": "Billing",
  "/traffic": "Traffic",
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
      key: "/workflow-automation",
      icon: <PartitionOutlined />,
      label: "Workflow Automation",
      onClick: () => navigate("/workflow-automation"),
    },
    {
      key: "workflow",
      icon: <ApiOutlined />,
      label: "API Workflow",
      children: [
        {
          key: "getStarted",
          label: "Get Started",
          children: [
            {
              key: "/api-workflow-introduction",
              label: "Introduction",
              onClick: () => navigate("/api-workflow-introduction"),
            },
            {
              key: "/api-workflow-quickstart",
              label: "Quickstart",
              onClick: () => navigate("/api-workflow-quickstart"),
            },
            {
              key: "/api-workflow-onboarding",
              label: "Onboarding",
              onClick: () => navigate("/api-workflow-onboarding"),
            },
          ],
          type: "group",
        },
        {
          key: "workflow",
          label: "Workflow",
          children: [
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
          ],
          type: "group",
        },
        {
          key: "configuration",
          label: "Configuration",
          children: [
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
          type: "group",
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
      width={SiderWidth}
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        background: token.colorBgContainer,
      }}
    >
      <div style={{ height: "64px" }} />
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        onOpenChange={onOpenKey}
        openKeys={currentOpenKeys}
        style={{ borderRight: 0 }}
        items={siderMenus}
      />
    </Sider>
  );
};
