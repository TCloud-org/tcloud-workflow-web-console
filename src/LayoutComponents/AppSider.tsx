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
import Sider from "antd/es/layout/Sider";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { AppBrand } from "./AppBrand";
import { AppMenu, AppMenuProps } from "./AppMenu";
import { theme } from "antd";

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
  "/service-configuration": "workflow",
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
  "/step-workflow": "Step Workflow",
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
  "/service-configuration": "Service",
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
  "/add-workflow": "Add Workflow",
  "/add-graph": "Add Graph",
  "/add-service-endpoint": "Add Service Endpoint",
  "/add-retry-policy": "Add Retry Policy",
  "/add-client": "Add Client",
  "/add-auth-token": "Add Auth Token",
};

export const AppSider = (props: {
  collapsed?: boolean;
  setCollapsed?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { token } = theme.useToken();

  const { collapsed, setCollapsed = () => {} } = props;

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
        className="top-[80px] lg:top-0 hidden lg:block glass-bar !rounded-none !shadow-none !border-t-0 !backdrop-blur-lg !fixed overflow-auto left-0 bottom-0 z-[100]"
        style={{ border: `1px solid ${token.colorBorder}` }}
      >
        <div>
          <div className="py-4">
            <AppBrand className="hidden lg:block" />
          </div>

          <AppMenu items={siderMenus} />
        </div>
      </Sider>

      <Sider
        collapsedWidth={0}
        ref={siderRef as any}
        width={SiderWidth}
        collapsed={collapsed}
        trigger={null}
        className="top-[64px] lg:top-0 block lg:hidden glass-bar !rounded-none !shadow-none !border-t-0 !backdrop-blur-lg !fixed overflow-auto left-0 bottom-0 z-[100]"
        style={{
          border: `1px solid ${token.colorBorder}`,
          backgroundColor: token.colorBgContainer,
          borderRightWidth: collapsed ? 0 : 1,
        }}
      >
        <AppMenu items={siderMenus} />
      </Sider>
    </>
  );
};
