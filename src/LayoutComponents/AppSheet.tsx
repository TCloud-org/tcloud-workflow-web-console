import { theme } from "antd";
import { CSSProperties, ReactNode, forwardRef } from "react";

export const AppSheet = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; children?: ReactNode }
>((props, ref) => {
  const { token } = theme.useToken();

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: token.colorBgContainer,
        borderRadius: token.borderRadiusLG,
        transition: "all 0.3s",
        overflow: "hidden",
        padding: "16px",
        border: `1px solid ${token.colorBorder}`,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
});
