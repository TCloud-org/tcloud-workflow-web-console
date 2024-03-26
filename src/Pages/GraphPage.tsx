import { Typography } from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT } from "../Config/EndpointConfig";
import { Graph } from "../Config/WorkflowConfig";
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
];

export const GraphPage = () => {
  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow
  );

  const [graphs, setGraphs] = useState<Graph[]>([]);
  // const [nextAvailableVersion, setNextAvailableVersion] = useState<number>(1);
  // const [liveGraph, setLiveGraph] = useState<Graph>();
  const [selected, setSelected] = useState<Key[]>([]);

  const fetchGraphs = useCallback(() => {
    if (workflowId) {
      axios
        .get(
          `${WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT}?workflowId=${workflowId}`
        )
        .then((response) => {
          setGraphs(response.data.graphs);
          // setNextAvailableVersion(response.data.nextAvailableVersion);
          // setLiveGraph(response.data.liveGraph);
        })
        .catch((error) => console.error(error));
    }
  }, [workflowId]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  return (
    <AppSpace>
      <Typography.Title level={4}>{workflowName}</Typography.Title>
      <AppTable
        rows={graphs.map((graph) => ({ key: graph.graphId, ...graph }))}
        columns={columns}
        selected={selected}
        onChange={(selectedRowKeys) => setSelected(selectedRowKeys)}
      />
    </AppSpace>
  );
};
