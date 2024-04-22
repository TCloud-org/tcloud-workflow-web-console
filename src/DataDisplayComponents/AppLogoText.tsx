import { Flex, Image, Typography } from "antd";

export const AppLogoText = () => {
  return (
    <Flex align="center" gap={16}>
      <Image
        src="https://tcw-icon.s3.us-west-2.amazonaws.com/7.png"
        width={60}
        preview={false}
        style={{
          animation: "spin 10s linear infinite",
        }}
      />
      <Typography.Title style={{ margin: 0 }} level={4}>
        The Cloud World
      </Typography.Title>
    </Flex>
  );
};
