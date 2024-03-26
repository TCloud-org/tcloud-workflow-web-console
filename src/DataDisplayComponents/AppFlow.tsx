import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

export const AppFlow = (props: { nodes?: Node[]; edges?: Edge[] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  useEffect(() => {
    setNodes(props.nodes || []);
    setEdges(props.edges || []);
  }, [props.nodes, props.edges, setEdges, setNodes]);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onEdgeClick = () => {};

  return (
    <div style={{ width: "70vw", height: "50vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        zoomOnScroll={false}
        panOnScroll={true}
        fitView
        onEdgeClick={onEdgeClick}
      >
        <Controls />
        <MiniMap pannable />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          color="black"
        />
      </ReactFlow>
    </div>
  );
};
