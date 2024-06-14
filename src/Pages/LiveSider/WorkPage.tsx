import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppRow } from "LayoutComponents/AppRow";
import { WorkflowInfo } from "WorkflowComponents/WorkflowInfo";
import { Col, Tabs, TreeDataNode } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Edge, useEdgesState, useNodesState } from "reactflow";
import { SelectItem, Span } from "../../Config/DataDisplayInterface";
import {
  WOS_GET_GRAPH_BY_ID_ENDPOINT,
  WOS_GET_ROUTES_BY_WORK_ID_ENDPOINT,
  WOS_VISUALIZE_ROUTES_FLOW_ENDPOINT,
} from "../../Config/WOSEndpointConfig";
import {
  Graph,
  Route,
  WorkflowConfiguration,
} from "../../Config/WorkflowConfig";
import { FormSelect } from "../../DataEntryComponents/FormSelect";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getWorkflowConfiguration } from "../../Network/WorkflowFetch";
import { populateFlowNodeData } from "../../Utils/ObjectUtils";
import { serializeRoute } from "../../Utils/Serializer";
import { LiveEntityTab } from "../../WorkflowComponents/LiveTab/LiveEntityTab";
import { LiveFlowTab } from "../../WorkflowComponents/LiveTab/LiveFlowTab";
import { LiveGraphTab } from "../../WorkflowComponents/LiveTab/LiveGraphTab";
import { LiveLogTab } from "../../WorkflowComponents/LiveTab/LiveLogTab";
import { LiveTreeTab } from "../../WorkflowComponents/LiveTab/LiveTreeTab";
import { LiveWorkflowViewTab } from "../../WorkflowComponents/LiveTab/LiveWorkflowViewTab";
import { WorkflowConfigurationInfo } from "../../WorkflowComponents/WorkflowConfigurationInfo";
import { WorkflowToolbar } from "../../WorkflowComponents/WorkflowToolbar";

export const WorkPage = () => {
  const { workId = "" } = useParams();

  const authToken = useSelector((state: any) => state.auth.token);

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
  const [restrictedAccess, setRestrictedAccess] = useState<
    Record<string, boolean>
  >({});

  const fetchGraph = useCallback(async () => {
    if (
      versionSelected &&
      routeMap[versionSelected] &&
      routeMap[versionSelected].length > 0
    ) {
      setGraphLoading(true);
      const graphId = routeMap[versionSelected][0].graphId;

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios
        .get(`${WOS_GET_GRAPH_BY_ID_ENDPOINT}?graphId=${graphId}`, config)
        .then((response) => {
          setGraph(response.data.graph as Graph);
        })
        .catch((error) => console.error(error));

      setGraphLoading(false);
    }
  }, [versionSelected, routeMap, authToken]);

  const fetchWorkflow = useCallback(() => {
    setWorkflowLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const params = new URLSearchParams();
    params.set("workId", workId);
    axios
      .get(`${WOS_GET_ROUTES_BY_WORK_ID_ENDPOINT}?${params}`, config)
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
  }, [workId, authToken]);

  const fetchFlowVisualization = useCallback(async () => {
    if (graph && graph.graphId && !isNaN(versionSelected)) {
      setFlowVisualLoading(true);
      const formData = {
        graphId: graph.graphId,
        workId,
        version: versionSelected,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios
        .post(WOS_VISUALIZE_ROUTES_FLOW_ENDPOINT, formData, config)
        .then((response) => {
          setNodes(populateFlowNodeData(response.data.nodes));
          setEdges(response.data.edges);
          setTreeNodes(response.data.treeNodes);
          setTreeNodeIds(response.data.treeNodeIds);
        })
        .catch((error) => {
          console.error(error);
          if (error.response.status === 403) {
            setRestrictedAccess((prev) => ({ ...prev, visual: true }));
          }
        });
      setFlowVisualLoading(false);
    }
  }, [graph, setEdges, setNodes, versionSelected, workId, authToken]);

  const fetchWorkflowConfiguration = useCallback(async () => {
    setConfigLoading(true);

    const workflowConfigMap: {
      [key: string]: WorkflowConfiguration | undefined;
    } = {};
    await Object.keys(routeMap).forEach(async (version) => {
      await getWorkflowConfiguration(workId, version, authToken).then(
        (data) => {
          workflowConfigMap[version] = data?.configuration;
        }
      );
    });
    setWorkflowConfigurationMap(workflowConfigMap);

    setConfigLoading(false);
  }, [routeMap, workId, authToken]);

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
      className="max-w-screen-2xl ml-auto mr-auto"
    >
      <AppRow gutter={[16, 16]}>
        <Col {...Span[1]}>
          <FormSelect
            placeholder="Select a version"
            options={versions}
            value={versionSelected}
            onChange={setVersionSelected}
          />
        </Col>

        <Col {...Span[1]}>
          <WorkflowToolbar
            onReload={reload}
            routes={routeMap[versionSelected]}
            graph={graph}
          />
        </Col>

        <Col {...Span[2]}>
          <WorkflowInfo graph={graph} routes={routeMap[versionSelected]} />
        </Col>

        <Col {...Span[2]}>
          <WorkflowConfigurationInfo
            data={workflowConfigurationMap}
            version={versionSelected}
          />
        </Col>
      </AppRow>
      <AppSurface type="form">
        <Tabs
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
              children: (
                <LiveFlowTab
                  nodes={nodes}
                  edges={edges}
                  restrictedAccess={restrictedAccess}
                />
              ),
            },
            {
              label: "Tree",
              key: "tree",
              children: (
                <LiveTreeTab
                  treeNodes={treeNodes}
                  treeNodeIds={treeNodeIds}
                  restrictedAccess={restrictedAccess}
                />
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
      </AppSurface>
    </AppSpace>
  );
};
