import { LinkOutlined } from "@ant-design/icons";
import { DescriptionsProps, Select, Typography } from "antd";
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
  Workflow,
} from "../../Config/WorkflowConfig";
import { AppDescriptions } from "../../DataDisplayComponents/AppDescriptions";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { AppTable } from "../../DataDisplayComponents/AppTable";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppLink } from "../../DataEntryComponents/AppLink";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { fetchGraphsById } from "../../Network/WorkflowFetch";
import { formatDate } from "../../Utils/DateUtils";

const columns: EditableColumn[] = [
  {
    title: "Id",
    dataIndex: "graphId",
    render: (text: string) => (
      <AppLink
        href={`/graph/${encodeURIComponent(text)}`}
        tooltip="Click to view or edit graph"
      >
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
      <Typography.Text>{formatDate(text)}</Typography.Text>
    ),
    sorter: (a, b) =>
      new Date(a["createdAt"]).getTime() - new Date(b["createdAt"]).getTime(),
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    render: (text: string) => (
      <Typography.Text>{formatDate(text)}</Typography.Text>
    ),
    sorter: (a, b) =>
      new Date(a["updatedAt"]).getTime() - new Date(b["updatedAt"]).getTime(),
    hidden: true,
  },
];

export const GraphPage = (props: { workflows?: Workflow[] }) => {
  const navigate = useNavigate();

  const { workflows = [] } = props;

  const authToken = useSelector((state: any) => state.auth.token);

  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [nextAvailableVersion, setNextAvailableVersion] = useState<number>(1);
  const [liveGraph, setLiveGraph] = useState<Graph>();
  const [selected, setSelected] = useState<Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [workflowSelected, setWorkflowSelected] = useState<
    string | undefined
  >();

  const graphDescriptions: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Workflow ID",
      children: liveGraph?.workflowId ? liveGraph.workflowId : "-",
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
    if (workflowSelected) {
      setLoading(true);
      fetchGraphsById(workflowSelected, authToken)
        .then((response: GetGraphsByWorkflowIdOutput | undefined) => {
          setGraphs(response?.graphs || []);
          setNextAvailableVersion(response?.nextAvailableVersion || 1);
          setLiveGraph(response?.liveGraph);
          setLoading(false);
        })
        .catch((_) => setLoading(false));
    }
  }, [workflowSelected, authToken]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  const handleCreateGraph = () => {
    navigate("/step-workflow/add-graph");
  };

  return (
    <AppSpace loading={loading}>
      <div className="flex items-center justify-between gap-4">
        <Select
          placeholder="Select a workflow"
          options={workflows.map((workflow) => ({
            label: workflow.workflowName,
            value: workflow.workflowId,
          }))}
          dropdownStyle={{ width: "auto" }}
          value={workflowSelected}
          onChange={setWorkflowSelected}
        />

        <AppButton onClick={handleCreateGraph} type="primary">
          Add graph
        </AppButton>
      </div>

      <AppSurface style={{ paddingBottom: 0 }}>
        <AppDescriptions title="Details" items={graphDescriptions} />
      </AppSurface>

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
    </AppSpace>
  );
};
