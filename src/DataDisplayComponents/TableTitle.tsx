import { ReloadOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
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
    <Flex justify="space-between" align="center" style={{ marginTop: "24px" }}>
      <AppSpace direction="horizontal" size="small" align="center">
        <Title style={{ margin: 0 }} level={5}>
          {props.children}
        </Title>
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
