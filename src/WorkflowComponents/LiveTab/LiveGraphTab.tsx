import { CodeBeam } from "DataDisplayComponents/CodeBeam";
import { Flex, Select } from "antd";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Edge, Node, useEdgesState, useNodesState } from "reactflow";
import { Graph, XMLTreeNode } from "../../Config/WorkflowConfig";
import { AppFlow } from "../../DataDisplayComponents/AppFlow";
import { AppTree } from "../../DataDisplayComponents/AppTree";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getGraphVisualization } from "../../Network/GraphFetch";
import { populateFlowNodeData } from "../../Utils/ObjectUtils";
import { GraphInfoCard } from "../GraphInfoCard";
import { dotStyle } from "DataDisplayComponents/AppSurface";

const OPTIONS = [
  {
    label: "View as XML Content",
    value: "xml",
  },
  {
    label: "View as Interactive Flow",
    value: "flow",
  },
  {
    label: "View as Tree Hierarchy",
    value: "tree",
  },
];

export const LiveGraphTab = (props: { graph?: Graph }) => {
  const { graph } = props;
  const authToken = useSelector((state: any) => state.auth.token);

  const [nodes, setNodes] = useNodesState<Node[]>([]);
  const [edges, setEdges] = useEdgesState<Edge[]>([]);
  const [treeNodes, setTreeNodes] = useState<XMLTreeNode[]>([]);
  const [treeNodeIds, setTreeNodeIds] = useState<Key[]>([]);
  const [viewAs, setViewAs] = useState<string>("xml");

  const fetchVisual = useCallback(async () => {
    if (graph && graph.graphArch?.xmlGraphFormat.xml) {
      const output = await getGraphVisualization(
        graph.graphArch?.xmlGraphFormat.xml || "",
        authToken
      ).catch((err) => {
        console.error(err.response.status);
        return undefined;
      });

      setNodes(populateFlowNodeData(output?.nodes || []));
      setEdges(output?.edges || []);
      setTreeNodes(output?.treeNodes || []);
      setTreeNodeIds(output?.treeNodeIds || []);
    }
  }, [graph, setNodes, setEdges, authToken]);

  useEffect(() => {
    fetchVisual();
  }, [fetchVisual]);

  const renderContent = (): JSX.Element => {
    if (viewAs === "flow") {
      return (
        <Flex justify="center" className="glass-card" style={dotStyle}>
          <AppFlow nodes={nodes} edges={edges} />
        </Flex>
      );
    }
    if (viewAs === "tree") {
      return <AppTree treeData={treeNodes} defaultExpandedKeys={treeNodeIds} />;
    }
    return (
      <CodeBeam
        value="xml"
        snippets={[
          {
            key: "xml",
            label: "XML",
            language: "xml",
            value: graph?.graphArch?.xmlGraphFormat.xml || "",
          },
        ]}
      />
    );
  };

  return (
    <AppSpace>
      <GraphInfoCard graph={graph} />
      <Select
        value={viewAs}
        onChange={(value) => setViewAs(value)}
        style={{ width: "100%" }}
        options={OPTIONS}
      />
      {renderContent()}
    </AppSpace>
  );
};
