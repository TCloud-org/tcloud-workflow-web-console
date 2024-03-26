import { CSSProperties, MouseEventHandler, ReactNode, forwardRef } from "react";

interface BoxProps {
  style?: CSSProperties;
  children?: ReactNode;
  align?: "left" | "center" | "right";
  onMouseEnter?: MouseEventHandler | undefined;
  onMouseLeave?: MouseEventHandler | undefined;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ style, children, align = "center", onMouseEnter, onMouseLeave }, ref) => {
    return (
      <div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ display: "flex", flex: 1, ...style }}
      >
        {(align === "right" || align === "center") && (
          <div style={{ flex: 1 }} />
        )}
        {children}
        {(align === "left" || align === "center") && (
          <div style={{ flex: 1 }} />
        )}
      </div>
    );
  }
);
