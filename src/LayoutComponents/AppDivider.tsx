import { Divider, DividerProps } from "antd";

export const AppDivider = (props: DividerProps) => {
  return <Divider {...props} style={{ margin: "8px 0", ...props.style }} />;
};
