import { Flex, Typography, theme } from "antd";

export const AppSubHeader = () => {
  const { token } = theme.useToken();

  return (
    <Flex
      style={{
        backgroundColor: token.colorBgContainer,
        height: 35,
        padding: "0 32px",
      }}
    >
      <Typography.Text>Workflow</Typography.Text>
    </Flex>
  );
};
