import { SearchOutlined } from "@ant-design/icons";
import { Input, InputProps } from "antd";

export const AppSearchBar = (props: InputProps) => {
  return <Input addonBefore={<SearchOutlined />} {...props} />;
};
