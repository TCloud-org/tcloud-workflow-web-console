import { ReloadOutlined } from "@ant-design/icons";
import { Flex, Tooltip, Typography } from "antd";
import { Fragment, ReactNode } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppSurface } from "./AppSurface";

export const AppHeading = (props: {
  children?: string;
  tooltip?: string;
  endDecorator?: ReactNode;
  onReload?: () => void;
  surface?: boolean;
}) => {
  const getSurface = (children?: ReactNode): JSX.Element => {
    if (props.surface) {
      return <AppSurface>{children}</AppSurface>;
    }
    return <Fragment>{children}</Fragment>;
  };

  return getSurface(
    <Flex justify="space-between" align="center">
      <Tooltip title={props.tooltip}>
        <Typography.Text strong>{props.children}</Typography.Text>
      </Tooltip>

      <AppSpace direction="horizontal" size="small" align="center">
        {props.endDecorator}
        {props.onReload && (
          <AppIconButton onClick={props.onReload} tooltip="Reload">
            <ReloadOutlined />
          </AppIconButton>
        )}
      </AppSpace>
    </Flex>
  );
};