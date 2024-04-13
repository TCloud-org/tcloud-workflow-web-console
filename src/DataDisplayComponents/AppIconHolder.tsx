import { borderColor } from "Config/AutomationConfig";
import { Flex, theme } from "antd";
import { ReactNode } from "react";

export const AppIconHolder = (props: { children?: ReactNode }) => {
  const { token } = theme.useToken();

  if (!props.children) return null;

  return (
    <Flex
      style={{
        padding: "16px",
        borderRadius: token.borderRadiusLG,
        border: "1.5px solid",
        borderColor: borderColor,
        color: borderColor,
        fontSize: "16px",
      }}
    >
      {props.children}
    </Flex>
  );
};
