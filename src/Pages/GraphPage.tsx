import { LinkOutlined } from "@ant-design/icons";
import { Descriptions, DescriptionsProps, Popconfirm, Typography } from "antd";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditableColumn } from "../Config/LayoutConfig";
import { GetGraphsByWorkflowIdOutput, Graph } from "../Config/WorkflowConfig";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppLink } from "../DataEntryComponents/AppLink";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { fetchGraphsById } from "../Network/WorkflowFetch";
import { formatDateString } from "../Utils/DateUtils";
import { Span } from "../Config/DataDisplayInterface";

const columns: EditableColumn[] = [
  {
    title: "Graph Id",
    dataIndex: "graphId",
    render: (text: string) => (
      <AppLink href={`/graph/${text}`} tooltip="Click to view or edit graph">
        {text}
      </AppLink>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    editable: true,
    width: "35%",
  },
  {
    title: "Alias",
    dataIndex: "alias",
    editable: true,
    width: "15%",
  },
  {
    title: "Version",
    dataIndex: "version",
  },
  {
    title: "Last Modified",
    dataIndex: "createdAt",
    render: (text: string) => (
      <Typography.Text>{formatDateString(text)}</Typography.Text>
    ),
  },
];

export const GraphPage = () => {
  const navigate = useNavigate();

  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow
  );

  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [nextAvailableVersion, setNextAvailableVersion] = useState<number>(1);
  const [liveGraph, setLiveGraph] = useState<Graph>();
  const [selected, setSelected] = useState<Key[]>([]);

  const graphDescriptions: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Live version",
      span: Span[3],
      children: (
        <a href={`/graph/${liveGraph?.graphId}`}>
          <LinkOutlined /> Version {liveGraph?.version}
        </a>
      ),
    },
    {
      key: "2",
      label: "Next available version",
      children: nextAvailableVersion,
      span: Span[3],
    },
  ];

  const fetchGraphs = useCallback(() => {
    if (workflowId) {
      fetchGraphsById(workflowId)
        .then((response: GetGraphsByWorkflowIdOutput | undefined) => {
          setGraphs(response?.graphs || []);
          setNextAvailableVersion(response?.nextAvailableVersion || 1);
          setLiveGraph(response?.liveGraph);
        })
        .catch((error) => console.error(error));
    }
  }, [workflowId]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  const handleCreateGraph = () => {
    navigate("/graph/create");
  };

  return (
    <AppSpace>
      <Typography.Title level={4}>{workflowName}</Typography.Title>

      <AppSurface>
        <Descriptions
          column={Span[1]}
          size="small"
          title="Details"
          items={graphDescriptions}
        />
      </AppSurface>

      <AppSpace direction="horizontal">
        <Popconfirm
          title={`Deprecate ${selected.length} graph${
            selected.length > 1 ? "s" : ""
          }`}
          description={`Are you sure to deprecate ${selected.length} graph${
            selected.length > 1 ? "s" : ""
          }?`}
          okText="Yes"
          cancelText="No"
          onConfirm={() => {}}
        >
          <AppButton type="primary" danger disabled={selected.length === 0}>
            {`Deprecate${
              selected.length > 0
                ? ` ${selected.length} graph${selected.length > 1 ? "s" : ""}`
                : ""
            }`}
          </AppButton>
        </Popconfirm>
        <AppButton onClick={handleCreateGraph}>Create a new graph</AppButton>
      </AppSpace>

      <AppTable
        rows={graphs}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        rowId="graphId"
      />
    </AppSpace>
  );
};
