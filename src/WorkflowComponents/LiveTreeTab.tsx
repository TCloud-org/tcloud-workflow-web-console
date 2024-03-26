import { TreeDataNode } from "antd";
import ForwardDirectoryTree from "antd/es/tree/DirectoryTree";
import { AppSpace } from "../LayoutComponents/AppSpace";

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

  const defaultExpandedKeys = getDefaultExpandedKeys();

  return (
    <AppSpace>
      <ForwardDirectoryTree
        multiple
        showLine
        treeData={treeNodes}
        showIcon={false}
        defaultExpandedKeys={defaultExpandedKeys}
      />
    </AppSpace>
  );
};
