import { Card, CardProps, theme } from "antd";

export const AppCard = (props: CardProps) => {
  const { token } = theme.useToken();

  return (
    <Card
      {...props}
      style={{ borderColor: token.colorBorder, ...props.style }}
    />
  );
};
