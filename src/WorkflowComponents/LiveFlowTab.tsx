import { Edge, Node } from "reactflow";
import { AppFlow } from "../DataDisplayComponents/AppFlow";
import { Box } from "../LayoutComponents/Box";

export const LiveFlowTab = (props: { nodes?: Node[]; edges?: Edge[] }) => {
  const { nodes = [], edges = [] } = props;

  return (
    <Box>
      <AppFlow nodes={nodes} edges={edges} />
    </Box>
  );
};
