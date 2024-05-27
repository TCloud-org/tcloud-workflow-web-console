import {
  AccountTreeRounded,
  DashboardRounded,
  DeveloperModeRounded,
  HelpRounded,
  MonitorHeartRounded,
  NotificationsRounded,
  PeopleRounded,
  SecurityRounded,
  SettingsRounded,
  StoreRounded,
} from "@mui/icons-material";
import { useClickAway } from "@uidotdev/usehooks";
import { SiderWidth } from "Config/LayoutConfig";
import { Flex, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { AppBrand } from "./AppBrand";
import { AppMenu, AppMenuProps } from "./AppMenu";

export const SiderHrefs = {
  home: "home",
  workflow: "workflow",
  security: "security",
  monitor: "monitor",
  people: "people",
  settings: "settings",
  help: "help",
  "/store": "/store",
  "/notification-hub": "/notification-hub",
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
  "/authentication": "security",
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
  "/notification-hub": "Notification Hub",
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
  "/authentication": "Auth Token",
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

  const siderMenus: AppMenuProps["items"] = [
    {
      key: "general",
      label: "General",
      type: "group",
      children: [
        {
          key: "dashboard",
          label: "Dashboard",
          icon: <DashboardRounded />,
          href: "/",
        },
      ],
    },
    {
      key: "automation",
      label: "Automation",
      type: "group",
      children: [
        {
          key: "step-workflow",
          icon: <AccountTreeRounded />,
          label: "Step Workflow",
          href: "/step-workflow",
        },
        {
          key: "/notification-hub",
          icon: <NotificationsRounded />,
          label: "Notification Hub",
          href: "/notification-hub",
        },
      ],
    },
    {
      key: "tools",
      label: "Tools",
      type: "group",
      children: [
        {
          key: "monitor",
          icon: <MonitorHeartRounded />,
          label: "Monitor",
          href: "/monitor",
        },
        {
          key: "people",
          icon: <PeopleRounded />,
          label: "People",
          href: "/people",
        },
        {
          key: "/store",
          icon: <StoreRounded />,
          label: "Store",
          href: "/store",
        },
      ],
    },
    {
      key: "support",
      label: "Support",
      type: "group",
      children: [
        {
          key: "/settings",
          icon: <SettingsRounded />,
          label: "Settings",
          href: "/settings",
        },
        {
          key: "security",
          icon: <SecurityRounded />,
          label: "Security",
          href: "/security",
        },
        {
          key: "help",
          icon: <HelpRounded />,
          label: "Help",
          href: "/help",
        },
      ],
    },
    ...(isDevMode
      ? [
          {
            key: "/development",
            icon: <DeveloperModeRounded />,
            label: "Development",
            href: "/development",
          },
        ]
      : []),
  ];

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

          <AppMenu items={siderMenus} />
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
        <AppMenu items={siderMenus} />
      </Sider>
    </>
  );
};
