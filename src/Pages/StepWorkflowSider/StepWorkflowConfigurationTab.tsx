import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { WorkflowPage } from "Pages/ApiWorkflowConfigurationSider/WorkflowPage";
import { GraphPage } from "Pages/GraphSider/GraphPage";
import { RetryPolicyPage } from "Pages/RetryPolicySider/RetryPolicyPage";
import { ServicePage } from "Pages/ServiceSider/ServicePage";
import { TabsProps } from "antd";
import { setConfigurationTabIndex } from "features/settings/stepWorkflowSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const StepWorkflowConfigurationTab = () => {
  const configurationTabIndex = useSelector(
    (state: any) => state.stepWorkflow.configurationTabIndex
  );
  const dispatch = useDispatch();

  const handleTabChange = (activeKey: string) => {
    dispatch(setConfigurationTabIndex(activeKey));
  };

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

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppMainTabs
      onChange={handleTabChange}
      activeKey={configurationTabIndex}
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
