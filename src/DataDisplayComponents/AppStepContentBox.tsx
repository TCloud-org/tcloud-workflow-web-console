import { Flex, SpaceProps, Typography } from "antd";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const AppStepContentBox = (
  props: SpaceProps & {
    title?: string;
  }
) => {
  return (
    <AppSpace style={{ padding: "16px", ...props.style }} size={props.size}>
      {props.title ? (
        <Flex justify="center">
          <Typography.Title style={{ margin: 0 }} level={5}>
            {props.title}
          </Typography.Title>
        </Flex>
      ) : null}
      {props.children}
    </AppSpace>
  );
};
