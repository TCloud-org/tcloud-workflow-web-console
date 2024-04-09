import { LinkOutlined } from "@ant-design/icons";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { Flex, Tooltip } from "antd";
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
        <a href={href} style={style}>
          {showIcon && <LinkOutlined />} {children}
        </a>
      </Tooltip>
      <AppCopy size="small" content={children} type="text" />
    </Flex>
  );
};
