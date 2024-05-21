import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { WorkflowPage } from "Pages/ApiWorkflowConfigurationSider/WorkflowPage";
import { GraphPage } from "Pages/GraphSider/GraphPage";
import { RetryPolicyPage } from "Pages/RetryPolicySider/RetryPolicyPage";
import { ServicePage } from "Pages/ServiceSider/ServicePage";
import { TabsProps } from "antd";
import { useEffect, useState } from "react";

export const StepWorkflowConfigurationTab = () => {
  const [tabPosition, setTabPosition] =
    useState<TabsProps["tabPosition"]>("left");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setTabPosition("top");
      } else {
        setTabPosition("left");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppMainTabs
      defaultActiveKey="workflow"
      tabindexkey="configurationTab"
      tabPosition={tabPosition}
      items={[
        {
          key: "workflow",
          label: "Workflow",
          children: <WorkflowPage />,
        },
        {
          key: "graph",
          label: "Graph",
          children: <GraphPage />,
        },
        {
          key: "service",
          label: "Service endpoint",
          children: <ServicePage />,
        },
        {
          key: "retry-policy",
          label: "Retry policy",
          children: <RetryPolicyPage />,
        },
      ]}
    />
  );
};
