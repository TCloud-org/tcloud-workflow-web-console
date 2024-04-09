import { TreeDataNode } from "antd";
import ForwardDirectoryTree, {
  DirectoryTreeProps,
} from "antd/es/tree/DirectoryTree";
import { Key } from "react";

export const AppTree = (
  props: DirectoryTreeProps & {
    treeData?: TreeDataNode[];
    defaultExpandedKeys?: Key[];
  }
) => {
  return <ForwardDirectoryTree multiple showLine showIcon={false} {...props} />;
};
