import { EditableColumn } from "Config/LayoutConfig";
import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import { Workflow } from "Config/WorkflowConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { formatDateString } from "Utils/DateUtils";
import { WorkflowCard } from "WorkflowComponents/WorkflowCard";
import { Col, Flex, Segmented, Typography } from "antd";
import axios from "axios";
import { setWorkflow } from "features/workflow/workflowSlice";
import { Key, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const WorkflowPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const activeWorkflow: Workflow | undefined = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const dispatch = useDispatch();

  const columns: EditableColumn[] = [
    {
      title: "Id",
      dataIndex: "workflowId",
    },
    {
      title: "Name",
      dataIndex: "workflowName",
    },
    {
      title: "Client",
      dataIndex: "clientId",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (text: string) => formatDateString(text),
    },
    {
      title: "Next Available Version",
      dataIndex: "nextAvailableVersion",
    },
    {
      title: "Action",
      fixed: "right",
      width: "10%",
      render: (value: Workflow) => (
        <Flex align="center" gap="8px">
          <AppButton
            size="small"
            onClick={() => {
              dispatch(setWorkflow(value));
              window.location.reload();
            }}
            danger={activeWorkflow?.workflowId === value.workflowId}
          >
            {activeWorkflow?.workflowId === value.workflowId
              ? "Deactivate"
              : "Activate"}
          </AppButton>
        </Flex>
      ),
    },
  ];

  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewAs, setViewAs] = useState<string>("Table");
  const [selected, setSelected] = useState<Key[]>([]);

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
          <AppRow gutter={[16, 16]} style={{ justifyContent: "center" }}>
            <Col span={12}>
              <WorkflowCard workflow={activeWorkflow} />
            </Col>
          </AppRow>
        </>
      )}

      <Typography.Title level={5}>Available Workflows</Typography.Title>

      <Segmented
        options={["Table", "Card"]}
        value={viewAs}
        onChange={setViewAs}
      />

      {viewAs === "Table" ? (
        <AppTable
          columns={columns}
          rows={workflows}
          showTitle={false}
          rowId="workflowId"
          selected={selected}
          setSelected={setSelected}
        />
      ) : (
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
      )}
    </AppSpace>
  );
};
