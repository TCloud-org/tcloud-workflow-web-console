import { Flex } from "antd";
import { Edge, Node } from "reactflow";
import { AppFlow } from "../../DataDisplayComponents/AppFlow";
import { PremiumMask } from "DataEntryComponents/PremiumMask";
import { dotStyle } from "DataDisplayComponents/AppSurface";

export const LiveFlowTab = (props: {
  nodes?: Node[];
  edges?: Edge[];
  restrictedAccess?: Record<string, boolean>;
}) => {
  const { nodes = [], edges = [], restrictedAccess = {} } = props;

  return (
    <Flex
      vertical
      justify="center"
      className="relative glass-card"
      style={dotStyle}
    >
      {restrictedAccess["visual"] && <PremiumMask />}
      <AppFlow nodes={nodes} edges={edges} />
    </Flex>
  );
};
