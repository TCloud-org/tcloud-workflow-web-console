import { theme } from "antd";
import { CSSProperties, ReactNode } from "react";

export const AppStepContent = (props: { children?: ReactNode }) => {
  const { token } = theme.useToken();

  const contentStyle: CSSProperties = {
    color: token.colorTextTertiary,
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    overflow: "auto",
  };

  return <div style={contentStyle}>{props.children}</div>;
};
