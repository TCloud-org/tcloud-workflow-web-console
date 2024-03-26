import { theme } from "antd";
import { CSSProperties, ReactNode, forwardRef } from "react";
import { Box } from "../LayoutComponents/Box";

interface AppSurfaceProps {
  children?: ReactNode;
  style?: CSSProperties;
}

export const AppSurface = forwardRef<HTMLDivElement, AppSurfaceProps>(
  ({ children, style }, ref) => {
    const { token } = theme.useToken();

    return (
      <Box
        ref={ref}
        style={{
          backgroundColor: token.colorFillAlter,
          borderRadius: token.borderRadiusLG,
          padding: "16px",
          transition: "0.2s",
          overflow: "hidden",
          ...style,
        }}
      >
        {children}
      </Box>
    );
  }
);
