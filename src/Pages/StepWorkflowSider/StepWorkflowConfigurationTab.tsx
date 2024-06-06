import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import { Workflow } from "Config/WorkflowConfig";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { WorkflowPage } from "Pages/ApiWorkflowConfigurationSider/WorkflowPage";
import { GraphPage } from "Pages/GraphSider/GraphPage";
import { RetryPolicyPage } from "Pages/RetryPolicySider/RetryPolicyPage";
import { ServicePage } from "Pages/ServiceSider/ServicePage";
import { TabsProps } from "antd";
import axios from "axios";
import { setConfigurationTabIndex } from "features/settings/stepWorkflowSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const StepWorkflowConfigurationTab = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const configurationTabIndex = useSelector(
    (state: any) => state.stepWorkflow.configurationTabIndex
  );
  const dispatch = useDispatch();

  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const handleTabChange = (activeKey: string) => {
    dispatch(setConfigurationTabIndex(activeKey));
  };

  const [tabPosition, setTabPosition] =
    useState<TabsProps["tabPosition"]>("left");

  const fetchWorkflows = useCallback(async () => {
    if (clientId) {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const workflows = await axios
        .get(
          `${WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`,
          config
        )
        .then((response) => response.data.workflows as Workflow[]);
      setWorkflows(workflows);
    }
  }, [clientId, authToken]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

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
          children: <WorkflowPage workflows={workflows} />,
        },
        {
          key: "graph",
          label: "Graph",
          children: <GraphPage workflows={workflows} />,
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
