import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectItem } from "../../Config/DataDisplayInterface";
import {
  WOS_GET_GRAPH_BY_ID_ENDPOINT,
  WOS_GET_ROUTES_BY_WORK_ID_ENDPOINT,
  WOS_VISUALIZE_ROUTES_FLOW_ENDPOINT,
} from "../../Config/WOSEndpointConfig";
import { AppCardTabs } from "../../DataDisplayComponents/AppCardTabs";
import { FormSelect } from "../../DataEntryComponents/FormSelect";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { serializeRoute } from "../../Utils/Serializer";
import { LiveWorkflowViewTab } from "../../WorkflowComponents/LiveTab/LiveWorkflowViewTab";
import { LiveFlowTab } from "../../WorkflowComponents/LiveTab/LiveFlowTab";
import { Edge, useEdgesState, useNodesState } from "reactflow";
import { populateFlowNodeData } from "../../Utils/ObjectUtils";
import { LiveTreeTab } from "../../WorkflowComponents/LiveTab/LiveTreeTab";
import { TreeDataNode } from "antd";
import {
  Graph,
  Route,
  WorkflowConfiguration,
} from "../../Config/WorkflowConfig";
import { LiveEntityTab } from "../../WorkflowComponents/LiveTab/LiveEntityTab";
import { LiveLogTab } from "../../WorkflowComponents/LiveTab/LiveLogTab";
import { WorkflowToolbar } from "../../WorkflowComponents/WorkflowToolbar";
import { getWorkflowConfiguration } from "../../Network/WorkflowFetch";
import { WorkflowConfigurationInfo } from "../../WorkflowComponents/WorkflowConfigurationInfo";
import { LiveGraphTab } from "../../WorkflowComponents/LiveTab/LiveGraphTab";

export const WorkPage = () => {
  const { workId = "" } = useParams();
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);

  const [workflowLoading, setWorkflowLoading] = useState<boolean>(false);
  const [graphLoading, setGraphLoading] = useState<boolean>(false);
  const [flowVisualLoading, setFlowVisualLoading] = useState<boolean>(false);
  const [configLoading, setConfigLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [routeMap, setRouteMap] = useState<{ [key: string]: Route[] }>({});
  const [versions, setVersions] = useState<SelectItem[]>([]);
  const [versionSelected, setVersionSelected] = useState<any>();
  const [graph, setGraph] = useState<Graph>();
  const [nodes, setNodes] = useNodesState<Node[]>([]);
  const [edges, setEdges] = useEdgesState<Edge[]>([]);
  const [treeNodes, setTreeNodes] = useState<TreeDataNode[]>();
  const [treeNodeIds, setTreeNodeIds] = useState([]);
  const [workflowConfigurationMap, setWorkflowConfigurationMap] = useState<{
    [key: string]: WorkflowConfiguration | undefined;
  }>({});

  const fetchGraph = useCallback(async () => {
    if (
      versionSelected &&
      routeMap[versionSelected] &&
      routeMap[versionSelected].length > 0
    ) {
      setGraphLoading(true);
      const graphId = routeMap[versionSelected][0].graphId;

      await axios
        .get(`${WOS_GET_GRAPH_BY_ID_ENDPOINT}?graphId=${graphId}`)
        .then((response) => {
          setGraph(response.data.graph as Graph);
        })
        .catch((error) => console.error(error));

      setGraphLoading(false);
    }
  }, [versionSelected, routeMap]);

  const fetchWorkflow = useCallback(() => {
    setWorkflowLoading(true);
    const params = new URLSearchParams();
    params.set("workId", workId);
    params.set("workflowId", workflowId);
    axios
      .get(`${WOS_GET_ROUTES_BY_WORK_ID_ENDPOINT}?${params}`)
      .then((response) => {
        const routeMapFromRes = response.data.routeMap || {};
        const versionOptions = Object.entries(routeMapFromRes)
          .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
          .map(([version, routes]) => ({
            label: `Version ${version} - ${serializeRoute(
              (routes as any[])[(routes as any[]).length - 1]
            )}`,
            value: version,
          }));

        setRouteMap(routeMapFromRes);
        setVersions(versionOptions);
        setVersionSelected(versionOptions[0].value);
        setWorkflowLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setWorkflowLoading(false);
      });
  }, [workId, workflowId]);

  const fetchFlowVisualization = useCallback(async () => {
    if (graph && graph.graphId && !isNaN(versionSelected)) {
      setFlowVisualLoading(true);
      const formData = {
        graphId: graph.graphId,
        workId,
        version: versionSelected,
      };
      await axios
        .post(WOS_VISUALIZE_ROUTES_FLOW_ENDPOINT, formData)
        .then((response) => {
          setNodes(populateFlowNodeData(response.data.nodes));
          setEdges(response.data.edges);
          setTreeNodes(response.data.treeNodes);
          setTreeNodeIds(response.data.treeNodeIds);
        })
        .catch((error) => console.error(error));
      setFlowVisualLoading(false);
    }
  }, [graph, setEdges, setNodes, versionSelected, workId]);

  const fetchWorkflowConfiguration = useCallback(async () => {
    setConfigLoading(true);

    const workflowConfigMap: {
      [key: string]: WorkflowConfiguration | undefined;
    } = {};
    await Object.keys(routeMap).forEach(async (version) => {
      await getWorkflowConfiguration(workId, version).then((data) => {
        workflowConfigMap[version] = data?.configuration;
      });
    });
    setWorkflowConfigurationMap(workflowConfigMap);

    setConfigLoading(false);
  }, [routeMap, workId]);

  const reload = async () => {
    setLoading(true);
    await fetchGraph();
    await fetchWorkflow();
    await fetchFlowVisualization();
    await fetchWorkflowConfiguration();
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkflowConfiguration();
  }, [fetchWorkflowConfiguration]);

  useEffect(() => {
    fetchFlowVisualization();
  }, [fetchFlowVisualization]);

  useEffect(() => {
    fetchWorkflow();
  }, [fetchWorkflow]);

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  return (
    <AppSpace
      loading={
        loading ||
        graphLoading ||
        workflowLoading ||
        flowVisualLoading ||
        configLoading
      }
    >
      <FormSelect
        placeholder="Select a version"
        options={versions}
        value={versionSelected}
        onChange={setVersionSelected}
      />
      <WorkflowToolbar
        onReload={reload}
        routes={routeMap[versionSelected]}
        graph={graph}
      />
      <WorkflowConfigurationInfo
        data={workflowConfigurationMap}
        version={versionSelected}
      />
      <AppCardTabs
        items={[
          {
            label: "Live",
            key: "live",
            children: (
              <LiveWorkflowViewTab
                routeMap={routeMap}
                versions={versions}
                version={versionSelected}
              />
            ),
          },
          {
            label: "Flow",
            key: "flow",
            children: <LiveFlowTab nodes={nodes} edges={edges} />,
          },
          {
            label: "Tree",
            key: "tree",
            children: (
              <LiveTreeTab treeNodes={treeNodes} treeNodeIds={treeNodeIds} />
            ),
          },
          {
            label: "Entity",
            key: "entity",
            children: <LiveEntityTab routes={routeMap[versionSelected]} />,
          },
          {
            label: "Log",
            key: "log",
            children: <LiveLogTab routes={routeMap[versionSelected]} />,
          },
          {
            label: "Graph",
            key: "graph",
            children: <LiveGraphTab graph={graph} />,
          },
        ]}
      />
    </AppSpace>
  );
};
