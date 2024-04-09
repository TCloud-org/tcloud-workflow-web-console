import { Typography, theme } from "antd";
import { DescriptionsItemType, DescriptionsProps } from "antd/es/descriptions";
import { AppDivider } from "../LayoutComponents/AppDivider";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { CSSProperties } from "react";

export const AppDescriptionItem = (
  props: DescriptionsItemType & {
    showDivider?: boolean;
    layout?: DescriptionsProps["layout"];
  }
) => {
  const { token } = theme.useToken();

  const horizontalStyle: CSSProperties = {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  };
  return (
    <AppSpace
      size="small"
      direction={props.layout}
      style={{
        ...(props.layout === "horizontal" && horizontalStyle),
      }}
    >
      <Typography.Text strong>{`${props.label}`}</Typography.Text>
      <div
        style={{
          color: token.colorTextLabel,
          display: "flex",
        }}
      >
        {props.children}
      </div>
      {props.showDivider && <AppDivider />}
    </AppSpace>
  );
};
