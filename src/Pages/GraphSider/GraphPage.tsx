import { LinkOutlined } from "@ant-design/icons";
import { DescriptionsProps, Popconfirm, Typography } from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Span } from "../../Config/DataDisplayInterface";
import { WOS_ADD_GRAPH_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { EditableColumn } from "../../Config/LayoutConfig";
import {
  GetGraphsByWorkflowIdOutput,
  Graph,
} from "../../Config/WorkflowConfig";
import { AppDescriptions } from "../../DataDisplayComponents/AppDescriptions";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { AppTable } from "../../DataDisplayComponents/AppTable";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppLink } from "../../DataEntryComponents/AppLink";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { fetchGraphsById } from "../../Network/WorkflowFetch";
import { formatDateString } from "../../Utils/DateUtils";

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
    sorter: (a, b) => a["version"] - b["version"],
  },
  {
    title: "Last Modified",
    dataIndex: "createdAt",
    render: (text: string) => (
      <Typography.Text>{formatDateString(text)}</Typography.Text>
    ),
    sorter: (a, b) =>
      new Date(a["createdAt"]).getTime() - new Date(b["createdAt"]).getTime(),
  },
];

export const GraphPage = () => {
  const navigate = useNavigate();

  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [nextAvailableVersion, setNextAvailableVersion] = useState<number>(1);
  const [liveGraph, setLiveGraph] = useState<Graph>();
  const [selected, setSelected] = useState<Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const graphDescriptions: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Workflow ID",
      children: liveGraph?.workflowId,
      span: Span[2],
    },
    {
      key: "2",
      label: "Live version",
      span: Span[2],
      children: liveGraph?.graphId ? (
        <a href={`/graph/${liveGraph?.graphId}`}>
          <LinkOutlined /> Version {liveGraph?.version}
        </a>
      ) : (
        "-"
      ),
    },
    {
      key: "3",
      label: "Next available version",
      children: nextAvailableVersion,
      span: Span[2],
    },
  ];

  const saveGraph = async (value: any) => {
    setLoading(true);
    await axios.post(WOS_ADD_GRAPH_ENDPOINT, value);
    fetchGraphs();
    setLoading(false);
  };

  const fetchGraphs = useCallback(() => {
    if (workflowId) {
      setLoading(true);
      fetchGraphsById(workflowId)
        .then((response: GetGraphsByWorkflowIdOutput | undefined) => {
          setGraphs(response?.graphs || []);
          setNextAvailableVersion(response?.nextAvailableVersion || 1);
          setLiveGraph(response?.liveGraph);
          setLoading(false);
        })
        .catch((_) => setLoading(false));
    }
  }, [workflowId]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  const handleCreateGraph = () => {
    navigate("/graph/create");
  };

  return (
    <AppSpace loading={loading}>
      <PageTitle>{workflowName}</PageTitle>

      <AppSurface style={{ paddingBottom: 0 }}>
        <AppDescriptions title="Details" items={graphDescriptions} />
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
        <AppButton onClick={handleCreateGraph} type="primary">
          Create a new graph
        </AppButton>
      </AppSpace>

      <AppTable
        rows={graphs}
        columns={columns.map((col) =>
          !col.editable ? col : { ...col, handleSave: saveGraph }
        )}
        selected={selected}
        setSelected={setSelected}
        rowId="graphId"
      />
    </AppSpace>
  );
};
