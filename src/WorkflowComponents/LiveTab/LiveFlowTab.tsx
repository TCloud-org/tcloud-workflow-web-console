import { Flex } from "antd";
import { Edge, Node } from "reactflow";
import { AppFlow } from "../../DataDisplayComponents/AppFlow";

export const LiveFlowTab = (props: { nodes?: Node[]; edges?: Edge[] }) => {
  const { nodes = [], edges = [] } = props;

  return (
    <Flex justify="center">
      <AppFlow nodes={nodes} edges={edges} />
    </Flex>
  );
};
