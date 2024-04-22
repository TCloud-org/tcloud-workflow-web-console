import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import { Workflow } from "Config/WorkflowConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { WorkflowCard } from "WorkflowComponents/WorkflowCard";
import { Col, Typography } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const WorkflowPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const activeWorkflow: Workflow | undefined = useSelector(
    (state: any) => state.workflow.workflow
  );

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkflows = useCallback(async () => {
    if (clientId) {
      setLoading(true);

      const workflows = await axios
        .get(`${WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`)
        .then((response) => response.data.workflows as Workflow[]);
      setWorkflows(workflows);

      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  return (
    <AppSpace loading={loading}>
      <PageTitle>Workflow</PageTitle>

      {activeWorkflow && (
        <>
          <Typography.Title level={5}>Active Workflow</Typography.Title>
          <AppRow gutter={[16, 16]}>
            <Col span={12}>
              <WorkflowCard workflow={activeWorkflow} />
            </Col>
          </AppRow>
        </>
      )}

      <Typography.Title level={5}>Available Workflows</Typography.Title>
      <AppRow gutter={[24, 24]}>
        {workflows
          .filter(
            (workflow) => workflow.workflowId !== activeWorkflow?.workflowId
          )
          .map((workflow, i) => (
            <Col key={i} span={12}>
              <WorkflowCard workflow={workflow} />
            </Col>
          ))}
      </AppRow>

      <AppTable />
    </AppSpace>
  );
};
