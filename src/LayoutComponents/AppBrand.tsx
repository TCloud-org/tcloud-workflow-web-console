import Icon from "@ant-design/icons/lib/components/Icon";
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
        transition: "all 0.3s",
        lineHeight: 0,
        margin: 0,
        ...props.style,
      }}
      className={`px-2 lg:px-4 ${props.className}`}
      strong
      href="/"
    >
      <Flex justify="center" align="center" className="gap-2">
        <Icon
          component={() => (
            <img
              alt={BRAND}
              src="https://utfs.io/f/bd04c0a7-53fe-4f53-9c25-e44a5e0afb75-ejb435.png"
              className="w-6"
            />
          )}
        />
        <Typography.Text strong className="text-xs hidden lg:block">
          {BRAND}
        </Typography.Text>
      </Flex>
    </Typography.Link>
  );
};
