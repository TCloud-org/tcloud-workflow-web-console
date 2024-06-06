import { Span } from "Config/DataDisplayInterface";
import { EditableColumn } from "Config/LayoutConfig";
import { Workflow } from "Config/WorkflowConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { formatDate } from "Utils/DateUtils";
import { WorkflowCard } from "WorkflowComponents/WorkflowCard";
import { Col, Flex, Segmented, Tag, Tooltip, Typography } from "antd";
import { setWorkflow } from "features/workflow/workflowSlice";
import { Key, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const WorkflowPage = (props: { workflows?: Workflow[] }) => {
  const activeWorkflow: Workflow | undefined = useSelector(
    (state: any) => state.workflow.workflow || {}
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { workflows = [] } = props;

  const columns: EditableColumn[] = [
    {
      title: "Id",
      dataIndex: "workflowId",
      render: (text: string) => (
        <Typography.Text className="flex items-center gap-2">
          {text} <AppCopy content={text} />
        </Typography.Text>
      ),
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
      render: (text: string) => formatDate(text),
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

  const [viewAs, setViewAs] = useState<string>("Table");
  const [selected, setSelected] = useState<Key[]>([]);

  const handleAddWorkflow = () => {
    navigate("/step-workflow/add-workflow");
  };

  return (
    <AppSpace>
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
