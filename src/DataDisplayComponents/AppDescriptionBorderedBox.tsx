import { theme } from "antd";
import { ReactNode } from "react";

export const AppDescriptionBorderedBox = (props: {
  children?: ReactNode;
  bordered?: boolean;
}) => {
  const { token } = theme.useToken();
  const { bordered = true } = props;
  return (
    <div
      style={{
        borderBottom: bordered ? `1px solid` : "0px solid",
        borderColor: token.colorBorderSecondary,
        paddingBottom: "20px",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};
