import { Flex } from "antd";
import { ReactNode } from "react";

export const AuthContainer = (props: { children?: ReactNode }) => {
  return (
    <Flex
      vertical
      align="center"
      gap={16}
      justify="center"
      className="max-w-screen-md ml-auto mr-auto w-full"
    >
      {props.children}
    </Flex>
  );
};
