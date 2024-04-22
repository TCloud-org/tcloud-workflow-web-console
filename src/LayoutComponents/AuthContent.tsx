import { Flex } from "antd";
import { ReactNode } from "react";
import { AppRow } from "./AppRow";

export const AuthContent = (props: { children?: ReactNode }) => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", width: "100vw", padding: 128 }}
    >
      <AppRow gutter={[32, 32]}>{props.children}</AppRow>
    </Flex>
  );
};
