import { theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { CSSProperties, ReactNode, forwardRef } from "react";

interface AppSurfaceProps {
  children?: ReactNode;
  style?: CSSProperties;
  hasSpace?: boolean;
  size?: SizeType;
  backgroundColor?: string;
  type?: "default" | "form" | "dot" | "border" | "dashed" | "shadow";
  className?: string;
  onClick?: () => void;
}

const SizeMapping: any = {
  small: "12px",
  middle: "16px",
  large: "20px",
};

export const dotStyle: CSSProperties = {
  background: "white",
  backgroundImage: `radial-gradient(black 1px, transparent 0)`,
  backgroundSize: "40px 40px",
};

export const AppSurface = forwardRef<HTMLDivElement, AppSurfaceProps>(
  (
    {
      children,
      style,
      hasSpace,
      size = "middle",
      backgroundColor,
      type,
      className,
      onClick,
    },
    ref
  ) => {
    const { token } = theme.useToken();

    const borderStyle: CSSProperties = {
      border: type === "dashed" ? "1px dashed" : "1px solid",
      borderColor:
        type === "form" ? token.colorBorder : token.colorBorderSecondary,
      backgroundColor: token.colorWhite,
    };

    const shadowStyle: CSSProperties = {
      border: "none",
      backgroundColor: token.colorWhite,
      boxShadow: token.boxShadow,
    };

    return (
      <div
        ref={ref}
        onClick={onClick}
        style={{
          backgroundColor:
            backgroundColor ||
            (type === "dot" ? "transparent" : token.colorFillQuaternary),
          borderRadius: token.borderRadiusLG,
          padding: hasSpace ? `0 ${SizeMapping[size]}` : SizeMapping[size],
          transition: "all 0.3s",
          ...((type === "form" || type === "border" || type === "dashed") &&
            borderStyle),
          ...(type === "dot" && dotStyle),
          ...(type === "shadow" && shadowStyle),
          ...style,
        }}
        className={`max-w-screen-2xl ml-auto mr-auto ${className}`}
      >
        {children}
      </div>
    );
  }
);
