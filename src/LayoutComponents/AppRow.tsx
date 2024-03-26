import { Row } from "antd";
import { CSSProperties, ReactNode, forwardRef } from "react";

export const AppRow = forwardRef<
  HTMLDivElement,
  { children?: ReactNode; style?: CSSProperties }
>((props, ref) => {
  return (
    <Row ref={ref} gutter={18} style={{ rowGap: "8px", ...props.style }}>
      {props.children}
    </Row>
  );
});
