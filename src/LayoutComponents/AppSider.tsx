import {
  ApiOutlined,
  CodeOutlined,
  HomeOutlined,
  MonitorOutlined,
  PartitionOutlined,
  SafetyOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  HeaderHeight,
  SiderCollapseWidth,
  SiderWidth,
} from "Config/LayoutConfig";
import { Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SiderHrefs = {
  home: "home",
  workflow: "workflow",
  security: "security",
  monitor: "monitor",
  people: "people",
  settings: "settings",
  "/workflow-automation": "/workflow-automation",
  "/development": "/development",
  "/api-workflow-introduction": "workflow",
  "/api-workflow-how-it-works": "workflow",
  "/api-workflow-quickstart": "workflow",
  "/api-workflow-onboarding": "workflow",
  "/api-workflow-model": "workflow",
  "/query": "workflow",
  "/live": "workflow",
  "/bucket": "workflow",
  "/workflow": "workflow",
  "/graph": "workflow",
  "/service": "workflow",
  "/retry-policy": "workflow",
  "/auth-token": "security",
  "/traffic": "monitor",
  "/client": "people",
  "/general": "settings",
  "/billing": "settings",
};

export const SiderName = {
  "/workflow-automation": "Workflow Automation",
  "/development": "Development",
  "/api-workflow-introduction": "Introduction",
  "/api-workflow-how-it-works": "How It Works",
  "/api-workflow-quickstart": "Quickstart",
  "/api-workflow-onboarding": "Onboarding",
  "/api-workflow-model": "Model",
  "/query": "Query",
  "/live": "Live",
  "/bucket": "Bucket",
  "/workflow": "Workflow",
  "/graph": "Graph",
  "/service": "Service",
  "/retry-policy": "Retry Policy",
  "/auth-token": "Auth Token",
  "/traffic": "Traffic",
  "/client": "Client",
  "/general": "General",
  "/billing": "Billing",
};

export const AppSider = (props: {
  collapsed?: boolean;
  isHovered?: boolean;
  setIsHovered?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { collapsed, isHovered, setIsHovered = () => {} } = props;

  const { token } = theme.useToken();
  const { isDevMode } = useSelector((state: any) => state.general);
  const selectedKeys: string[] = useSelector(
    (state: any) => state.sider.selectedKeys
  );
  const navigate = useNavigate();
  // const [currentOpenKeys, setCurrentOpenKeys] = useState<string[]>([]);

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
              key: "/api-workflow-how-it-works",
              label: "How It Works",
              onClick: () => navigate("/api-workflow-how-it-works"),
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
            {
              key: "/api-workflow-model",
              label: "Model",
              onClick: () => navigate("/api-workflow-model"),
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
              key: "/workflow",
              label: "Workflow",
              onClick: () => navigate("/workflow"),
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
      key: "people",
      icon: <UsergroupAddOutlined />,
      label: "People",
      children: [
        {
          key: "/client",
          label: "Client",
          onClick: () => navigate("/client"),
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

  // useEffect(() => {
  //   if (selectedKeys) {
  //     setCurrentOpenKeys(
  //       selectedKeys.length > 0
  //         ? [SiderHrefs[selectedKeys[0].toString() as keyof typeof SiderHrefs]]
  //         : ["home"]
  //     );
  //   }
  // }, [selectedKeys]);

  // const onOpenKey = (openKeys: string[]) => {
  //   setCurrentOpenKeys(openKeys.slice(-1));
  // };

  return (
    <Sider
      collapsedWidth={SiderCollapseWidth}
      width={SiderWidth}
      collapsed={collapsed && !isHovered}
      onMouseEnter={() => {
        if (!isHovered) {
          setIsHovered(true);
        }
      }}
      trigger={null}
      onMouseLeave={() => {
        if (isHovered) {
          setIsHovered(false);
        }
      }}
      style={{
        overflow: "auto",
        position: "fixed",
        left: 0,
        top: HeaderHeight,
        bottom: 0,
        background: token.colorBgContainer,
        transition: "0.2s",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        // onOpenChange={onOpenKey}
        // openKeys={currentOpenKeys}
        style={{ borderRight: 0, overflow: "auto" }}
        items={siderMenus}
      />
    </Sider>
  );
};
