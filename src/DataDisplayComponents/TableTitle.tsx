import { ReloadOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { ReactNode } from "react";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const TableTitle = (props: {
  children?: ReactNode;
  onReload?: () => void;
  headerEndDecorator?: ReactNode;
}) => {
  const { onReload, headerEndDecorator } = props;

  return (
    <Flex justify="space-between" align="center">
      <Title level={5}>{props.children}</Title>
      <AppSpace direction="horizontal" size="small">
        {headerEndDecorator}
        {onReload && <Button onClick={onReload} icon={<ReloadOutlined />} />}
      </AppSpace>
    </Flex>
  );
};
