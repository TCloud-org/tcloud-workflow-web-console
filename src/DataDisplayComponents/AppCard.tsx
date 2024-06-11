import { Card, CardProps } from "antd";
import { forwardRef } from "react";

export const AppCard = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <Card
      {...props}
      ref={ref}
      styles={{
        actions: {
          backgroundColor: "transparent",
        },
      }}
      className={`glass-card transition-all duration-300 ${props.className}`}
    />
  );
});

AppCard.displayName = "AppCard";
