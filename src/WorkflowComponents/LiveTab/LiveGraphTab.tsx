import { Flex, Select } from "antd";
import { Key, useCallback, useEffect, useState } from "react";
import { Edge, Node, useEdgesState, useNodesState } from "reactflow";
import { Graph, XMLTreeNode } from "../../Config/WorkflowConfig";
import { AppFlow } from "../../DataDisplayComponents/AppFlow";
import { AppTree } from "../../DataDisplayComponents/AppTree";
import { CodeDisplay } from "../../DataDisplayComponents/CodeDisplay";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getGraphVisualization } from "../../Network/GraphFetch";
import { populateFlowNodeData } from "../../Utils/ObjectUtils";
import { GraphInfoCard } from "../GraphInfoCard";
import { useSelector } from "react-redux";

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
    if (graph && graph.xmlContent) {
      const output = await getGraphVisualization(
        graph.xmlContent,
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
        <Flex justify="center">
          <AppFlow nodes={nodes} edges={edges} />
        </Flex>
      );
    }
    if (viewAs === "tree") {
      return <AppTree treeData={treeNodes} defaultExpandedKeys={treeNodeIds} />;
    }
    return (
      <CodeDisplay
        language="xml"
        code={graph?.xmlContent}
        hovered
        showLineNumbers
        bordered
        copyToClipboard
        backgroundColor="white"
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
