import { Card, CardProps } from "antd";

export const AppCard = (props: CardProps) => {
  return (
    <Card
      {...props}
      className={`glass-card transition-all duration-300 ${props.className}`}
    />
  );
};
