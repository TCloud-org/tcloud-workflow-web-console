import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import { Workflow } from "Config/WorkflowConfig";
import { scrollToId } from "DataDisplayComponents/PageTitle";
import { WorkflowPage } from "Pages/ApiWorkflowConfigurationSider/WorkflowPage";
import { GraphPage } from "Pages/GraphSider/GraphPage";
import { RetryPolicyPage } from "Pages/RetryPolicySider/RetryPolicyPage";
import { ServicePage } from "Pages/ServiceSider/ServicePage";
import { Divider } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const StepWorkflowConfigurationTab = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);
  const location = useLocation();

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [workflowLoading, setWorkflowLoading] = useState<boolean>(false);

  const fetchWorkflows = useCallback(async () => {
    if (clientId) {
      setWorkflowLoading(true);

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

      setWorkflowLoading(false);
    }
  }, [clientId, authToken]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  useEffect(() => {
    if (location.hash) {
      scrollToId(location.hash.slice(1));
    }
  }, [location.hash]);

  return (
    <div>
      <WorkflowPage
        workflows={workflows}
        onReload={fetchWorkflows}
        loading={workflowLoading}
      />

      <Divider />

      <GraphPage workflows={workflows} />

      <Divider />

      <ServicePage />

      <Divider />

      <RetryPolicyPage />
    </div>
  );
};
