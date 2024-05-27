import { ReloadOutlined } from "@ant-design/icons";
import { Span } from "Config/DataDisplayInterface";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Typography } from "antd";
import { ReactNode } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const PageTitle = (props: {
  children?: ReactNode;
  endDecorator?: ReactNode;
  className?: string;
  onReload?: () => void;
}) => {
  return (
    <AppRow
      gutter={[16, 16]}
      style={{ padding: "8px 0" }}
      className={props.className}
    >
      <Col {...Span[2]} className="flex justify-center lg:justify-start">
        <Typography.Title level={4}>{props.children}</Typography.Title>
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
