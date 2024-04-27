import { Flex, Typography } from "antd";
import { AppLogo } from "./AppLogo";

export const AppLogoText = () => {
  return (
    <Flex align="center" gap={16}>
      <AppLogo size={60} spin />
      <Typography.Title style={{ margin: 0 }} level={4}>
        The Cloud World
      </Typography.Title>
    </Flex>
  );
};
