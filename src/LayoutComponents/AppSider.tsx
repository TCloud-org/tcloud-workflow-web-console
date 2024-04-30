import {
  ApiOutlined,
  CodeOutlined,
  HomeOutlined,
  MonitorOutlined,
  PartitionOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  SettingOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useClickAway } from "@uidotdev/usehooks";
import { HeaderHeight, SiderWidth } from "Config/LayoutConfig";
import { AppMenuPin } from "DataDisplayComponents/AppMenuPin";
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
  help: "help",
  "/store": "/store",
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
  "/account": "settings",
  "/general": "settings",
  "/billing": "settings",
  "/support": "help",
  "/contact": "help",
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
  "/account": "Account",
  "/general": "General",
  "/billing": "Billing",
  "/support": "Support",
  "/contact": "Contact",
  "/store": "Store",
};

export const AppSider = (props: {
  collapsed?: boolean;
  setCollapsed?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { collapsed, setCollapsed = () => {} } = props;

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
              label: <AppMenuPin>/api-workflow-introduction</AppMenuPin>,
              onClick: () => navigate("/api-workflow-introduction"),
            },
            {
              key: "/api-workflow-how-it-works",
              label: <AppMenuPin>/api-workflow-how-it-works</AppMenuPin>,
              onClick: () => navigate("/api-workflow-how-it-works"),
            },
            {
              key: "/api-workflow-quickstart",
              label: <AppMenuPin>/api-workflow-quickstart</AppMenuPin>,
              onClick: () => navigate("/api-workflow-quickstart"),
            },
            {
              key: "/api-workflow-onboarding",
              label: <AppMenuPin>/api-workflow-onboarding</AppMenuPin>,
              onClick: () => navigate("/api-workflow-onboarding"),
            },
            {
              key: "/api-workflow-model",
              label: <AppMenuPin>/api-workflow-model</AppMenuPin>,
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
              label: <AppMenuPin>/query</AppMenuPin>,
              onClick: () => navigate("/query"),
            },
            {
              key: "/live",
              label: <AppMenuPin>/live</AppMenuPin>,
              onClick: () => navigate("/live"),
            },
            {
              key: "/bucket",
              label: <AppMenuPin>/bucket</AppMenuPin>,
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
              label: <AppMenuPin>/workflow</AppMenuPin>,
              onClick: () => navigate("/workflow"),
            },
            {
              key: "/graph",
              label: <AppMenuPin>/graph</AppMenuPin>,
              onClick: () => navigate("/graph"),
            },
            {
              key: "/service",
              label: <AppMenuPin>/service</AppMenuPin>,
              onClick: () => navigate("/service"),
            },
            {
              key: "/retry-policy",
              label: <AppMenuPin>/retry-policy</AppMenuPin>,
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
          label: <AppMenuPin>/traffic</AppMenuPin>,
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
          label: <AppMenuPin>/auth-token</AppMenuPin>,
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
          label: <AppMenuPin>/client</AppMenuPin>,
          onClick: () => navigate("/client"),
        },
      ],
    },
    {
      key: "/store",
      icon: <ShopOutlined />,
      label: "Store",
      onClick: () => navigate("/store"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      children: [
        {
          key: "/account",
          label: <AppMenuPin>/account</AppMenuPin>,
          onClick: () => navigate("/account"),
        },
        {
          key: "/general",
          label: <AppMenuPin>/general</AppMenuPin>,
          onClick: () => navigate("/general"),
        },
        {
          key: "/billing",
          label: <AppMenuPin>/billing</AppMenuPin>,
          onClick: () => navigate("/billing"),
        },
      ],
    },
    {
      key: "help",
      icon: <QuestionCircleOutlined />,
      label: "Help",
      children: [
        {
          key: "/support",
          label: <AppMenuPin>/support</AppMenuPin>,
          onClick: () => navigate("/support"),
        },
        {
          key: "/contact",
          label: <AppMenuPin>/contact</AppMenuPin>,
          onClick: () => navigate("/contact"),
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

  const siderRef = useClickAway((e: any) => {
    const elementId = (e.target || e.srcElement).id;
    if (elementId !== "menu-button") {
      setCollapsed(true);
    }
  });

  return (
    <Sider
      collapsedWidth={0}
      ref={siderRef as any}
      width={SiderWidth}
      collapsed={collapsed}
      // onMouseEnter={() => {
      //   if (!isHovered) {
      //     setIsHovered(true);
      //   }
      // }}
      // onMouseLeave={() => {
      //   if (isHovered) {
      //     setIsHovered(false);
      //   }
      // }}
      // onBlur={() => {
      //   setCollapsed(true);
      // }}
      trigger={null}
      style={{
        overflow: "auto",
        position: "fixed",
        left: 0,
        top: HeaderHeight,
        bottom: 0,
        zIndex: 100,
        background: token.colorBgContainer,
        borderRight: "1px solid",
        borderRightColor: token.colorBorderSecondary,
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
