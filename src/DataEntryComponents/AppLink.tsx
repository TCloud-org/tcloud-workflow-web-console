import { LinkOutlined } from "@ant-design/icons";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { Flex, Tooltip, Typography } from "antd";
import { CSSProperties } from "react";

export const AppLink = (props: {
  children?: string | undefined;
  href?: string | undefined;
  tooltip?: string | undefined;
  showIcon?: boolean;
  style?: CSSProperties;
}) => {
  const { children, href, tooltip, showIcon = true, style } = props;
  return (
    <Flex gap="4px" align="center">
      <Tooltip title={tooltip}>
        <Typography.Link href={href} style={style}>
          {showIcon && <LinkOutlined />} {children}
        </Typography.Link>
      </Tooltip>
      <AppCopy content={children} />
    </Flex>
  );
};
