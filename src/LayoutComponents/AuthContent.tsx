import { Flex } from "antd";
import { ReactNode } from "react";
import { AppRow } from "./AppRow";

export const AuthContent = (props: { children?: ReactNode }) => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", width: "100vw" }}
      className="auth-bg px-4"
    >
      <AppRow gutter={[0, 0]} style={{ height: "100%", width: "100%" }}>
        {props.children}
      </AppRow>
    </Flex>
  );
};
