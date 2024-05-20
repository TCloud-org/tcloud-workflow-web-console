import { Row } from "antd";
import { CSSProperties, ReactNode, forwardRef } from "react";

export const AppRow = forwardRef<
  HTMLDivElement,
  {
    children?: ReactNode;
    style?: CSSProperties;
    gutter?: number | [number, number];
    id?: string;
  }
>((props, ref) => {
  const { gutter = 24 } = props;
  return (
    <Row ref={ref} id={props.id} gutter={gutter} style={{ ...props.style }}>
      {props.children}
    </Row>
  );
});
