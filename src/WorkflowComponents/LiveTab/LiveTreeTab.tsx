import { TreeDataNode } from "antd";
import { AppTree } from "../../DataDisplayComponents/AppTree";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { PremiumMask } from "DataEntryComponents/PremiumMask";

export const LiveTreeTab = (props: {
  treeNodes?: TreeDataNode[];
  treeNodeIds?: string[];
  restrictedAccess?: Record<string, boolean>;
}) => {
  const { treeNodes = [], restrictedAccess = {} } = props;

  const getDefaultExpandedKeys = () => {
    if (treeNodes.length === 0) {
      return [];
    }
    return [treeNodes[0].key];
  };

  return (
    <AppSpace style={{ position: "relative" }}>
      {restrictedAccess["visual"] && <PremiumMask />}
      {treeNodes.length > 0 ? (
        <AppTree
          treeData={treeNodes}
          defaultExpandedKeys={getDefaultExpandedKeys()}
        />
      ) : (
        <div className="h-72" />
      )}
    </AppSpace>
  );
};
