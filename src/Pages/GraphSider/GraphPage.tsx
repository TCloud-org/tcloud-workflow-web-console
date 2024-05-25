import { LinkOutlined } from "@ant-design/icons";
import { DescriptionsProps, Typography } from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Span } from "../../Config/DataDisplayInterface";
import { EditableColumn } from "../../Config/LayoutConfig";
import { WOS_ADD_GRAPH_ENDPOINT } from "../../Config/WOSEndpointConfig";
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
    title: "Id",
    dataIndex: "graphId",
    render: (text: string) => (
      <AppLink href={`/graph/${text}`} tooltip="Click to view or edit graph">
        {text}
      </AppLink>
    ),
  },
  {
    title: "Client Id",
    dataIndex: "clientId",
    hidden: true,
  },
  {
    title: "Workflow Id",
    dataIndex: "workflowId",
    hidden: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    editable: true,
  },
  {
    title: "Alias",
    dataIndex: "alias",
    editable: true,
  },
  {
    title: "Version",
    dataIndex: "version",
    sorter: (a, b) => a["version"] - b["version"],
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    render: (text: string) => (
      <Typography.Text>{formatDateString(text)}</Typography.Text>
    ),
    sorter: (a, b) =>
      new Date(a["createdAt"]).getTime() - new Date(b["createdAt"]).getTime(),
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    render: (text: string) => (
      <Typography.Text>{formatDateString(text)}</Typography.Text>
    ),
    sorter: (a, b) =>
      new Date(a["updatedAt"]).getTime() - new Date(b["updatedAt"]).getTime(),
    hidden: true,
  },
];

export const GraphPage = () => {
  const navigate = useNavigate();

  const authToken = useSelector((state: any) => state.auth.token);
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
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios.post(WOS_ADD_GRAPH_ENDPOINT, value, config);
    fetchGraphs();
    setLoading(false);
  };

  const fetchGraphs = useCallback(() => {
    if (workflowId) {
      setLoading(true);
      fetchGraphsById(workflowId, authToken)
        .then((response: GetGraphsByWorkflowIdOutput | undefined) => {
          setGraphs(response?.graphs || []);
          setNextAvailableVersion(response?.nextAvailableVersion || 1);
          setLiveGraph(response?.liveGraph);
          setLoading(false);
        })
        .catch((_) => setLoading(false));
    }
  }, [workflowId, authToken]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  const handleCreateGraph = () => {
    navigate("/step-workflow/add-graph");
  };

  return (
    <AppSpace loading={loading}>
      <PageTitle
        endDecorator={
          <AppButton onClick={handleCreateGraph} type="primary">
            Create graph
          </AppButton>
        }
      >
        {workflowName}
      </PageTitle>

      <AppSurface type="form" style={{ paddingBottom: 0 }}>
        <AppDescriptions title="Details" items={graphDescriptions} />
      </AppSurface>

      <AppSurface type="form">
        <AppTable
          rows={graphs}
          columns={columns.map((col) =>
            !col.editable ? col : { ...col, handleSave: saveGraph }
          )}
          selected={selected}
          heading="Graphs"
          setSelected={setSelected}
          rowId="graphId"
        />
      </AppSurface>
    </AppSpace>
  );
};
