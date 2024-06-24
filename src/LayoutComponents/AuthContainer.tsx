import { Flex } from "antd";
import { ReactNode } from "react";

export const AuthContainer = (props: { children?: ReactNode }) => {
  return (
    <Flex
      vertical
      align="center"
      gap={16}
      justify="center"
      className="max-w-screen-sm ml-auto mr-auto w-full bg-white py-12 rounded-3xl"
    >
      {props.children}
    </Flex>
  );
};
