import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectItem } from "../Config/DataDisplayInterface";
import {
  WOS_GET_GRAPH_BY_ID_ENDPOINT,
  WOS_GET_ROUTES_BY_WORK_ID_ENDPOINT,
  WOS_VISUALIZE_ROUTES_FLOW_ENDPOINT,
} from "../Config/EndpointConfig";
import { AppCardTabs } from "../DataDisplayComponents/AppCardTabs";
import { FormSelect } from "../DataEntryComponents/FormSelect";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { serializeRoute } from "../Utils/Serializer";
import { LiveWorkflowViewTab } from "../WorkflowComponents/LiveWorkflowViewTab";
import { LiveFlowTab } from "../WorkflowComponents/LiveFlowTab";
import { Edge, useEdgesState, useNodesState } from "reactflow";
import { populateFlowNodeData } from "../Utils/ObjectUtils";
import { LiveTreeTab } from "../WorkflowComponents/LiveTreeTab";
import { TreeDataNode } from "antd";
import { Graph, Route } from "../Config/WorkflowConfig";
import { LiveEntityTab } from "../WorkflowComponents/LiveEntityTab";
import { LiveLogTab } from "../WorkflowComponents/LiveLogTab";
import { WorkflowToolbar } from "../WorkflowComponents/WorkflowToolbar";

export const WorkPage = () => {
  const { workId = "" } = useParams();
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);

  const [loading, setLoading] = useState<boolean>(false);
  const [routeMap, setRouteMap] = useState<{ [key: string]: Route[] }>({});
  const [versions, setVersions] = useState<SelectItem[]>([]);
  const [versionSelected, setVersionSelected] = useState<any>();
  const [graph, setGraph] = useState<Graph>();
  const [nodes, setNodes] = useNodesState<Node[]>([]);
  const [edges, setEdges] = useEdgesState<Edge[]>([]);
  const [treeNodes, setTreeNodes] = useState<TreeDataNode[]>();
  const [treeNodeIds, setTreeNodeIds] = useState([]);

  const fetchGraph = useCallback(() => {
    if (versionSelected) {
      const graphId = routeMap[versionSelected][0].graphId;

      axios
        .get(`${WOS_GET_GRAPH_BY_ID_ENDPOINT}?graphId=${graphId}`)
        .then((response) => {
          setGraph(response.data.graph as Graph);
        })
        .catch((error) => console.error(error));
    }
  }, [versionSelected, routeMap]);

  const fetchWorkflow = useCallback(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [workId, workflowId]);

  const fetchFlowVisualization = useCallback(() => {
    if (graph && graph.graphId && !isNaN(versionSelected)) {
      const formData = {
        graphId: graph.graphId,
        workId,
        version: versionSelected,
      };
      axios
        .post(WOS_VISUALIZE_ROUTES_FLOW_ENDPOINT, formData)
        .then((response) => {
          setNodes(populateFlowNodeData(response.data.nodes));
          setEdges(response.data.edges);
          setTreeNodes(response.data.treeNodes);
          setTreeNodeIds(response.data.treeNodeIds);
        })
        .catch((error) => console.error(error));
    }
  }, [graph, setEdges, setNodes, versionSelected, workId]);

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
    <AppSpace loading={loading}>
      <FormSelect
        placeholder="Select a version"
        options={versions}
        value={versionSelected}
        onChange={setVersionSelected}
      />
      <WorkflowToolbar
        onReload={fetchWorkflow}
        routes={routeMap[versionSelected]}
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
        ]}
      />
    </AppSpace>
  );
};
