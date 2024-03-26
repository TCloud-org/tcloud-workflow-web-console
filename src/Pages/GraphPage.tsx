import { LinkOutlined } from "@ant-design/icons";
import {
  Button,
  Descriptions,
  DescriptionsProps,
  Popconfirm,
  Typography,
} from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT } from "../Config/EndpointConfig";
import { Graph } from "../Config/WorkflowConfig";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { formatDateString } from "../Utils/DateUtils";

const columns: (Exclude<any, undefined>[number] & {
  editable?: boolean;
  dataIndex: string;
})[] = [
  {
    title: "Graph Id",
    dataIndex: "graphId",
    render: (text: string) => <a href={`/graph/${text}`}>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Alias",
    dataIndex: "alias",
    editable: true,
    width: "20%",
    onCell: (record: any) => ({
      record,
      editable: true,
      dataIndex: "alias",
      title: "Alias",
      handleSave: (_: any) => {},
    }),
  },
  {
    title: "Version",
    dataIndex: "version",
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    render: (text: string) => (
      <Typography.Text>{formatDateString(text)}</Typography.Text>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: () => <Button>Edit</Button>,
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
      span: 1,
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
      span: 1,
    },
  ];

  const fetchGraphs = useCallback(() => {
    if (workflowId) {
      axios
        .get(
          `${WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT}?workflowId=${workflowId}`
        )
        .then((response) => {
          setGraphs(response.data.graphs);
          setNextAvailableVersion(response.data.nextAvailableVersion);
          setLiveGraph(response.data.liveGraph);
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
          size="small"
          title="Graph Info"
          items={graphDescriptions}
        />
      </AppSurface>

      <AppSpace direction="horizontal">
        <Popconfirm
          title={`Delete ${selected.length} item${
            selected.length > 1 ? "s" : ""
          }`}
          description={`Are you sure to delete ${selected.length} item${
            selected.length > 1 ? "s" : ""
          }?`}
          okText="Yes"
          cancelText="No"
          onConfirm={() => {}}
        >
          <Button type="primary" danger disabled={selected.length === 0}>
            {`Delete${
              selected.length > 0
                ? ` ${selected.length} item${selected.length > 1 ? "s" : ""}`
                : ""
            }`}
          </Button>
        </Popconfirm>
        <Button onClick={handleCreateGraph}>Create a new graph</Button>
      </AppSpace>

      <AppTable
        rows={graphs.map((graph) => ({ key: graph.graphId, ...graph }))}
        columns={columns}
        selected={selected}
        onChange={(selectedRowKeys) => setSelected(selectedRowKeys)}
      />
    </AppSpace>
  );
};
