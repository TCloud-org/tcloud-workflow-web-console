import { ReloadOutlined } from "@ant-design/icons";
import { Flex, Tooltip, Typography } from "antd";
import { Fragment, ReactNode } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const AppHeading = (props: {
  children?: string;
  tooltip?: string;
  endDecorator?: ReactNode;
  onReload?: () => void;
  surface?: boolean;
}) => {
  const getSurface = (children?: ReactNode): JSX.Element => {
    return <Fragment>{children}</Fragment>;
  };

  return getSurface(
    <Flex justify="space-between" align="flex-start">
      <Tooltip title={props.tooltip}>
        <Typography.Text strong>{props.children}</Typography.Text>
      </Tooltip>

      <AppSpace direction="horizontal" align="center">
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
