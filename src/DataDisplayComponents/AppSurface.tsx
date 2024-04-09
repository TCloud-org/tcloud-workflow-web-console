import { theme } from "antd";
import { CSSProperties, ReactNode, forwardRef } from "react";
import { Box } from "../LayoutComponents/Box";
import { SizeType } from "antd/es/config-provider/SizeContext";

interface AppSurfaceProps {
  children?: ReactNode;
  style?: CSSProperties;
  hasSpace?: boolean;
  size?: SizeType;
  backgroundColor?: string;
  border?: "default" | "input";
}

const SizeMapping: any = {
  small: "12px",
  middle: "16px",
  large: "20px",
};

export const AppSurface = forwardRef<HTMLDivElement, AppSurfaceProps>(
  (
    { children, style, hasSpace, size = "middle", backgroundColor, border },
    ref
  ) => {
    const { token } = theme.useToken();

    const borderStyle: CSSProperties = {
      border: "1px solid",
      borderColor:
        border === "input" ? token.colorBorder : token.colorBorderSecondary,
      backgroundColor: token.colorWhite,
    };

    return (
      <Box
        ref={ref}
        style={{
          backgroundColor: backgroundColor || token.colorFillQuaternary,
          borderRadius: token.borderRadiusLG,
          padding: hasSpace ? `0 ${SizeMapping[size]}` : SizeMapping[size],
          transition: "0.2s",
          overflow: "hidden",
          ...(border && borderStyle),
          ...style,
        }}
      >
        {children}
      </Box>
    );
  }
);
