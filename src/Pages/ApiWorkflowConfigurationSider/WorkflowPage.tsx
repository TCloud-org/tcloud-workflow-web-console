import { Span } from "Config/DataDisplayInterface";
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
import { Col, Flex, Segmented, Tag, Tooltip, Typography } from "antd";
import axios from "axios";
import { setWorkflow } from "features/workflow/workflowSlice";
import { Key, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const WorkflowPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);
  const activeWorkflow: Workflow | undefined = useSelector(
    (state: any) => state.workflow.workflow || {}
  );
  const navigate = useNavigate();
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
              if (activeWorkflow?.workflowId === value.workflowId) {
                dispatch(setWorkflow(undefined));
              } else {
                dispatch(setWorkflow(value));
              }
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

      setLoading(false);
    }
  }, [clientId, authToken]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const handleAddWorkflow = () => {
    navigate("/workflow/add");
  };

  console.log(workflows);
  return (
    <AppSpace loading={loading}>
      <PageTitle
        endDecorator={
          <AppButton onClick={handleAddWorkflow} type="primary">
            Add a new workflow
          </AppButton>
        }
      >
        Workflow
      </PageTitle>

      {activeWorkflow?.workflowId && (
        <>
          <Typography.Title level={5} style={{ marginBottom: 0 }}>
            Active Workflow
          </Typography.Title>
          <Tooltip title="Active">
            <Tag className="rounded-lg px-4 py-2">
              {activeWorkflow.workflowName}
            </Tag>
          </Tooltip>
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
          {workflows.map((workflow, i) => (
            <Col key={i} {...Span[2]}>
              <WorkflowCard workflow={workflow} />
            </Col>
          ))}
        </AppRow>
      )}
    </AppSpace>
  );
};
