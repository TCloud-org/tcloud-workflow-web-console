import { Flex, Typography } from "antd";
import { ReactNode } from "react";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { ReloadOutlined } from "@ant-design/icons";

export const PageTitle = (props: {
  children?: ReactNode;
  endDecorator?: ReactNode;
  onReload?: () => void;
}) => {
  return (
    <Flex justify="space-between" align="center" style={{ padding: "8px 0" }}>
      <Typography.Title level={2}>{props.children}</Typography.Title>
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
