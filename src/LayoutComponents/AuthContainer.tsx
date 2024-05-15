import { Flex } from "antd";
import { ReactNode } from "react";

export const AuthContainer = (props: { children?: ReactNode }) => {
  return (
    <Flex
      vertical
      align="center"
      gap={16}
      justify="center"
      className="bg-white w-auto max-w-screen-md ml-auto mr-auto pt-8 rounded-lg shadow-slate-700/20 shadow-md lg:w-full lg:shadow-none lg:rounded-none lg:pt-0 lg:bg-transparent"
    >
      {props.children}
    </Flex>
  );
};
