import { PremiumMask } from "DataEntryComponents/PremiumMask";
import { Flex } from "antd";
import { Edge, Node } from "reactflow";
import { AppFlow } from "../../DataDisplayComponents/AppFlow";

export const LiveFlowTab = (props: {
  nodes?: Node[];
  edges?: Edge[];
  restrictedAccess?: Record<string, boolean>;
}) => {
  const { nodes = [], edges = [], restrictedAccess = {} } = props;

  return (
    <Flex vertical justify="center" className="relative glass-card">
      {restrictedAccess["visual"] && <PremiumMask />}
      <AppFlow nodes={nodes} edges={edges} />
    </Flex>
  );
};
