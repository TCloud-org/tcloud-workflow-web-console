import { forwardRef, CSSProperties, ReactNode } from "react";
import { Space } from "antd";
import { AppLoading } from "../FeedbackComponents/AppLoading";

interface AppSpaceProps {
  children?: ReactNode;
  size?: "large" | "middle" | "small";
  loading?: boolean;
  direction?: "vertical" | "horizontal";
  style?: CSSProperties;
}

export const AppSpace = forwardRef<HTMLDivElement, AppSpaceProps>(
  (props, ref) => {
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
  }
);
