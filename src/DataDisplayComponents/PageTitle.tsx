import { ReloadOutlined } from "@ant-design/icons";
import { Span } from "Config/DataDisplayInterface";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Typography } from "antd";
import { CSSProperties, ReactNode } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { TitleProps } from "antd/es/typography/Title";

export const PageTitle = (props: {
  children?: ReactNode;
  endDecorator?: ReactNode;
  className?: string;
  onReload?: () => void;
  level?: TitleProps["level"];
  textStyle?: CSSProperties;
  style?: CSSProperties;
}) => {
  return (
    <AppRow
      gutter={[16, 16]}
      style={{ padding: "8px 0", ...props.style }}
      className={props.className}
    >
      <Col {...Span[2]} className="flex justify-center lg:justify-start">
        <Typography.Title level={props.level || 4} style={props.textStyle}>
          {props.children}
        </Typography.Title>
      </Col>
      <Col {...Span[2]} className="flex justify-center lg:justify-end">
        <AppSpace direction="horizontal" size="small" align="center">
          {props.endDecorator}
          {props.onReload && (
            <AppIconButton
              type="primary"
              onClick={props.onReload}
              tooltip="Reload"
            >
              <ReloadOutlined />
            </AppIconButton>
          )}
        </AppSpace>
      </Col>
    </AppRow>
  );
};
