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
import { Col, Segmented, Typography } from "antd";
import {
  setConfigurationTabIndex,
  setGraphWorkflowId,
} from "features/settings/stepWorkflowSlice";
import { Key, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const WorkflowPage = (props: { workflows?: Workflow[] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { workflows = [] } = props;

  const columns: EditableColumn[] = [
    {
      title: "Id",
      dataIndex: "workflowId",
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <Typography.Link
            onClick={() => {
              dispatch(setGraphWorkflowId(text));
              dispatch(setConfigurationTabIndex("graph"));
            }}
          >
            {text}
          </Typography.Link>{" "}
          <AppCopy content={text} />
        </div>
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
      title: "Next Version",
      dataIndex: "nextAvailableVersion",
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
            Add workflow
          </AppButton>
        }
      >
        Workflow
      </PageTitle>

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
