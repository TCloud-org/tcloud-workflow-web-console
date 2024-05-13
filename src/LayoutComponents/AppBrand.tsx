import Icon from "@ant-design/icons/lib/components/Icon";
import { HeaderHeight } from "Config/LayoutConfig";
import { BRAND } from "Config/WOSEndpointConfig";
import { Flex, Typography } from "antd";
import { CSSProperties } from "react";

export const AppBrand = (props: {
  className?: string;
  style?: CSSProperties;
}) => {
  return (
    <Typography.Link
      style={{
        textAlign: "center",
        alignContent: "center",
        borderRadius: 0,
        color: "black",
        height: HeaderHeight / 2,
        transition: "all 0.3s",
        lineHeight: 0,
        margin: 0,
        ...props.style,
      }}
      className={`px-2 lg:px-4 ${props.className}`}
      strong
      href="/"
    >
      <Flex justify="center" align="center" className="gap-1 lg:gap-2">
        <Icon
          component={() => (
            <img
              alt={BRAND}
              src="https://tcw-icon.s3.us-west-2.amazonaws.com/7.png"
              className="w-6"
            />
          )}
        />
        <Typography.Text strong className="text-xs">
          {BRAND}
        </Typography.Text>
      </Flex>
    </Typography.Link>
  );
};
