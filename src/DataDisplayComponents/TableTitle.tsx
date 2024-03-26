import { ReloadOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { ReactNode } from "react";

export const TableTitle = (props: {
  children?: ReactNode;
  onReload?: () => void;
}) => {
  const { onReload } = props;

  return (
    <Flex justify="space-between" align="center">
      <Title level={5}>{props.children}</Title>
      {onReload && <Button onClick={onReload} icon={<ReloadOutlined />} />}
    </Flex>
  );
};
