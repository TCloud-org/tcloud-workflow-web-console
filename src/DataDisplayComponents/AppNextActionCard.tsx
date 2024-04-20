import { borderColor } from "Config/AutomationConfig";
import { Card, Flex, Typography, theme } from "antd";
import { CSSProperties, ReactElement, ReactNode, cloneElement } from "react";
import { useNavigate } from "react-router-dom";

export const AppNextActionCard = (props: {
  title?: string;
  description?: string;
  icon?: ReactNode;
  iconBackgroundColor?: string;
  href?: string;
  style?: CSSProperties;
}) => {
  const navigate = useNavigate();

  const { token } = theme.useToken();

  const {
    title,
    description,
    icon,
    iconBackgroundColor = borderColor,
    href = "/",
    style,
  } = props;

  return (
    <Card
      bordered={false}
      style={{
        cursor: "pointer",
        boxShadow: token.boxShadowSecondary,
        height: "100%",
        ...style,
      }}
      onClick={() => navigate(href)}
    >
      <Flex align="flex-start" gap={16}>
        <div
          style={{
            padding: "8px 12px",
            backgroundColor: iconBackgroundColor,
            borderRadius: token.borderRadiusLG,
          }}
        >
          {cloneElement(icon as ReactElement, {
            style: { color: token.colorWhite },
          })}
        </div>
        <Flex vertical>
          <Typography.Text strong>{title}</Typography.Text>
          <Typography.Text
            style={{ fontSize: "12px", color: token.colorTextDescription }}
          >
            {description}
          </Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};
