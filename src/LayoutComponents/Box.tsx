import { CSSProperties, MouseEventHandler, ReactNode, forwardRef } from "react";

interface BoxProps {
  style?: CSSProperties;
  children?: ReactNode;
  align?: "left" | "center" | "right";
  onMouseEnter?: MouseEventHandler | undefined;
  onMouseLeave?: MouseEventHandler | undefined;
  className?: string;
  onClick?: () => void;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      style,
      children,
      align = "center",
      onMouseEnter,
      onMouseLeave,
      className,
      onClick,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{ display: "flex", flex: 1, flexDirection: "column", ...style }}
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
