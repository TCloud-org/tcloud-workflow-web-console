import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { WorkflowPage } from "Pages/ApiWorkflowConfigurationSider/WorkflowPage";
import { GraphPage } from "Pages/GraphSider/GraphPage";
import { RetryPolicyPage } from "Pages/RetryPolicySider/RetryPolicyPage";
import { ServicePage } from "Pages/ServiceSider/ServicePage";

export const StepWorkflowConfigurationTab = () => {
  return (
    <AppMainTabs
      defaultActiveKey="workflow"
      tabIndexKey="configurationTab"
      tabPosition="left"
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
