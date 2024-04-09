import { TreeDataNode } from "antd";
import { AppTree } from "../../DataDisplayComponents/AppTree";
import { AppSpace } from "../../LayoutComponents/AppSpace";

export const LiveTreeTab = (props: {
  treeNodes?: TreeDataNode[];
  treeNodeIds?: string[];
}) => {
  const { treeNodes = [] } = props;

  const getDefaultExpandedKeys = () => {
    if (treeNodes.length === 0) {
      return [];
    }
    return [treeNodes[0].key];
  };

  return (
    <AppSpace>
      <AppTree
        treeData={treeNodes}
        defaultExpandedKeys={getDefaultExpandedKeys()}
      />
    </AppSpace>
  );
};
