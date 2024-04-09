import { Flex, Switch, SwitchProps, Typography } from "antd";

export const AppSwitch = (
  props: SwitchProps & {
    children?: string;
  }
) => {
  const { children } = props;
  return (
    <Flex gap="8px" align="center">
      <Switch size="small" {...props} />
      <Typography.Text>{children}</Typography.Text>
    </Flex>
  );
};
