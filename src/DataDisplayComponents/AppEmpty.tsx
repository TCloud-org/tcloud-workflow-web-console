import { Empty, Flex } from "antd";
import { Box } from "../LayoutComponents/Box";
import { CSSProperties, ReactNode } from "react";

export const AppEmpty = (props: {
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <Box>
      <Empty style={props.style} image={Empty.PRESENTED_IMAGE_SIMPLE} />
      <Flex justify="center">{props.children}</Flex>
    </Box>
  );
};
