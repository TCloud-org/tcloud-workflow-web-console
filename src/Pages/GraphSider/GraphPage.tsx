import { LinkOutlined } from "@ant-design/icons";
import { DescriptionsProps, Select, Typography } from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setGraphWorkflowId } from "features/settings/stepWorkflowSlice";
import { PageTitle } from "DataDisplayComponents/PageTitle";

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
  const dispatch = useDispatch();

  const { workflows = [] } = props;

  const authToken = useSelector((state: any) => state.auth.token);
  const graphWorkflowId = useSelector(
    (state: any) => state.stepWorkflow.graphWorkflowId
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
      label: "Next version",
      children: nextAvailableVersion,
      span: Span[2],
    },
  ];

  const saveGraph = async (value: Graph) => {
    setLoading(true);
    const formData = {
      graphId: value.graphId,
      clientId: value.clientId,
      workflowId: value.workflowId,
      description: value.description,
      alias: value.alias,
      version: value.version,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios.post(WOS_ADD_GRAPH_ENDPOINT, formData, config);
    await fetchGraphs();
    setLoading(false);
  };

  const fetchGraphs = useCallback(async () => {
    if (graphWorkflowId) {
      setLoading(true);
      await fetchGraphsById(graphWorkflowId, authToken)
        .then((response: GetGraphsByWorkflowIdOutput | undefined) => {
          setGraphs(response?.graphs || []);
          setNextAvailableVersion(response?.nextAvailableVersion || 1);
          setLiveGraph(response?.liveGraph);
          setLoading(false);
        })
        .catch((_) => setLoading(false));
    }
  }, [graphWorkflowId, authToken]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  const handleCreateGraph = () => {
    navigate("/step-workflow/add-graph");
  };

  return (
    <AppSpace loading={loading} className="p-4">
      <PageTitle
        id="graph"
        onReload={fetchGraphs}
        startDecorator={
          <Select
            placeholder="Select a workflow"
            options={workflows.map((workflow) => ({
              label: workflow.workflowName,
              value: workflow.workflowId,
            }))}
            dropdownStyle={{ width: "auto" }}
            value={graphWorkflowId}
            onChange={(value: string) => dispatch(setGraphWorkflowId(value))}
          />
        }
        endDecorator={
          <AppButton onClick={handleCreateGraph} type="primary">
            Add graph
          </AppButton>
        }
      >
        Graph
      </PageTitle>

      <AppSurface style={{ paddingBottom: 0 }}>
        <AppDescriptions title="Details" items={graphDescriptions} />
      </AppSurface>

      <AppTable
        rows={[...graphs]}
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
