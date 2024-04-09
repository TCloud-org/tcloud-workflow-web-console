import { Space, SpaceProps } from "antd";
import { forwardRef } from "react";
import { AppLoading } from "../FeedbackComponents/AppLoading";

export const AppSpace = forwardRef<
  HTMLDivElement,
  SpaceProps & { loading?: boolean }
>((props, ref) => {
  const {
    size = "middle",
    loading = false,
    direction = "vertical",
    style,
    children,
  } = props;
  return (
    <AppLoading loading={loading}>
      <Space
        ref={ref}
        direction={direction}
        size={size}
        style={{ display: "flex", ...style }}
      >
        {children}
      </Space>
    </AppLoading>
  );
});
