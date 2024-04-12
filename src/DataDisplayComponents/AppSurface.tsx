import { theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { CSSProperties, ReactNode, forwardRef } from "react";
import { Box } from "../LayoutComponents/Box";

interface AppSurfaceProps {
  children?: ReactNode;
  style?: CSSProperties;
  hasSpace?: boolean;
  size?: SizeType;
  backgroundColor?: string;
  type?: "default" | "form" | "dot" | "border";
}

const SizeMapping: any = {
  small: "12px",
  middle: "16px",
  large: "20px",
};

export const AppSurface = forwardRef<HTMLDivElement, AppSurfaceProps>(
  (
    { children, style, hasSpace, size = "middle", backgroundColor, type },
    ref
  ) => {
    const { token } = theme.useToken();

    const borderStyle: CSSProperties = {
      border: "1px solid",
      borderColor:
        type === "form" ? token.colorBorder : token.colorBorderSecondary,
      backgroundColor: token.colorWhite,
    };

    const dotStyle: CSSProperties = {
      background: "white",
      backgroundImage: `radial-gradient(black 1px, transparent 0)`,
      backgroundSize: "40px 40px",
    };

    return (
      <Box
        ref={ref}
        style={{
          backgroundColor:
            backgroundColor ||
            (type === "dot" ? "transparent" : token.colorFillQuaternary),
          borderRadius: token.borderRadiusLG,
          padding: hasSpace ? `0 ${SizeMapping[size]}` : SizeMapping[size],
          transition: "0.2s",
          overflow: "auto",
          ...((type === "form" || type === "border") && borderStyle),
          ...(type === "dot" && dotStyle),
          ...style,
        }}
      >
        {children}
      </Box>
    );
  }
);
