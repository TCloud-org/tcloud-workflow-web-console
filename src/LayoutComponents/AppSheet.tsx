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
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        transition: "0.2s",
        overflow: "hidden",
        padding: "16px",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
});
