import { ReloadOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { ReactNode } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const TableTitle = (props: {
  children?: ReactNode;
  onReload?: () => void;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
  afterReloadDecorator?: ReactNode;
}) => {
  const { onReload, startDecorator, endDecorator, afterReloadDecorator } =
    props;

  return (
    <Flex justify="space-between" align="flex-start">
      <AppSpace direction="horizontal" size="small" align="center">
        <Typography.Text
          style={{ margin: 0 }}
          className="text-slate-700 font-semibold"
        >
          {props.children}
        </Typography.Text>
        {startDecorator}
      </AppSpace>
      <AppSpace direction="horizontal" size="small" align="center">
        {endDecorator}
        {onReload && (
          <AppIconButton onClick={onReload} tooltip="Reload">
            <ReloadOutlined />
          </AppIconButton>
        )}
        {afterReloadDecorator}
      </AppSpace>
    </Flex>
  );
};
