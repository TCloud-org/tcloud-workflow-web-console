import { Row } from "antd";
import { CSSProperties, ReactNode, forwardRef } from "react";

export const AppRow = forwardRef<
  HTMLDivElement,
  {
    children?: ReactNode;
    style?: CSSProperties;
    gutter?: number | [number, number];
  }
>((props, ref) => {
  const { gutter = 24 } = props;
  return (
    <Row ref={ref} gutter={gutter} style={{ ...props.style }}>
      {props.children}
    </Row>
  );
});
