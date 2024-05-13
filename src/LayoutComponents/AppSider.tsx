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
import { SiderWidth } from "Config/LayoutConfig";
import { AppMenuPin } from "DataDisplayComponents/AppMenuPin";
import { Flex, Menu, MenuProps, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBrand } from "./AppBrand";

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
  "/step-workflow-introduction": "workflow",
  "/step-workflow-how-it-works": "workflow",
  "/step-workflow-quickstart": "workflow",
  "/step-workflow-onboarding": "workflow",
  "/step-workflow-model": "workflow",
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
  "/subscription": "settings",
  "/support": "help",
  "/contact": "help",
};

export const SiderName = {
  "/workflow-automation": "Workflow Automation",
  "/development": "Development",
  "/step-workflow-introduction": "Introduction",
  "/step-workflow-how-it-works": "How It Works",
  "/step-workflow-quickstart": "Quickstart",
  "/step-workflow-onboarding": "Onboarding",
  "/step-workflow-model": "Model",
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
  "/subscription": "Subscription",
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
      label: "Step Workflow",
      children: [
        {
          key: "getStarted",
          label: "Get Started",
          children: [
            {
              key: "/step-workflow-introduction",
              label: <AppMenuPin>/step-workflow-introduction</AppMenuPin>,
              onClick: () => navigate("/step-workflow-introduction"),
            },
            {
              key: "/step-workflow-how-it-works",
              label: <AppMenuPin>/step-workflow-how-it-works</AppMenuPin>,
              onClick: () => navigate("/step-workflow-how-it-works"),
            },
            {
              key: "/step-workflow-quickstart",
              label: <AppMenuPin>/step-workflow-quickstart</AppMenuPin>,
              onClick: () => navigate("/step-workflow-quickstart"),
            },
            {
              key: "/step-workflow-onboarding",
              label: <AppMenuPin>/step-workflow-onboarding</AppMenuPin>,
              onClick: () => navigate("/step-workflow-onboarding"),
            },
            {
              key: "/step-workflow-model",
              label: <AppMenuPin>/step-workflow-model</AppMenuPin>,
              onClick: () => navigate("/step-workflow-model"),
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
        {
          key: "/subscription",
          label: <AppMenuPin>/subscription</AppMenuPin>,
          onClick: () => navigate("/subscription"),
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
    <>
      <Sider
        ref={siderRef as any}
        width={SiderWidth}
        trigger={null}
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 100,
          background: token.colorBgContainer,
          borderRight: "1px solid",
          borderRightColor: token.colorBorderSecondary,
        }}
        className="top-[80px] lg:top-0 hidden lg:block"
      >
        <Flex vertical>
          <AppBrand
            style={{ borderBottom: `1px solid ${token.colorBorder}` }}
            className="hidden lg:block"
          />

          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            style={{
              borderRight: 0,
              overflow: "auto",
            }}
            items={siderMenus}
          />
        </Flex>
      </Sider>

      <Sider
        collapsedWidth={0}
        ref={siderRef as any}
        width={SiderWidth}
        collapsed={collapsed}
        trigger={null}
        style={{
          overflow: "auto",
          position: "fixed",
          left: 0,
          bottom: 0,
          zIndex: 100,
          background: token.colorBgContainer,
          borderRight: "1px solid",
          borderRightColor: token.colorBorderSecondary,
        }}
        className="top-[80px] lg:top-0 block lg:hidden"
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          style={{
            borderRight: 0,
            overflow: "auto",
          }}
          items={siderMenus}
        />
      </Sider>
    </>
  );
};
