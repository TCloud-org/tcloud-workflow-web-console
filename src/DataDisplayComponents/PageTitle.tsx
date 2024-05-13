import { Col, Flex, Typography } from "antd";
import { ReactNode } from "react";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { ReloadOutlined } from "@ant-design/icons";
import { AppRow } from "LayoutComponents/AppRow";
import { Span } from "Config/DataDisplayInterface";

export const PageTitle = (props: {
  children?: ReactNode;
  endDecorator?: ReactNode;
  onReload?: () => void;
}) => {
  return (
    <AppRow gutter={[16, 16]} style={{ padding: "8px 0" }}>
      <Col {...Span[2]} className="flex justify-center lg:justify-start">
        <Typography.Title level={2}>{props.children}</Typography.Title>
      </Col>
      <Col {...Span[2]} className="flex justify-center lg:justify-end">
        <AppSpace direction="horizontal" size="small" align="center">
          {props.endDecorator}
          {props.onReload && (
            <AppIconButton onClick={props.onReload} tooltip="Reload">
              <ReloadOutlined />
            </AppIconButton>
          )}
        </AppSpace>
      </Col>
    </AppRow>
  );
};
