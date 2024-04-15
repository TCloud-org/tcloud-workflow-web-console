import { borderColor } from "Config/AutomationConfig";
import { Card, Flex, Typography, theme } from "antd";
import { CSSProperties } from "react";

export const TemplateChip = (props: {
  title?: string;
  src?: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  const { token } = theme.useToken();

  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    cursor: "pointer",
    borderWidth: "1px",
    borderColor: props.active ? borderColor : token.colorBorderSecondary,
  };

  return (
    <Card
      onClick={props.onClick}
      cover={
        <img
          alt="template"
          src={props.src}
          style={{ height: "20vh", objectFit: "contain", maxWidth: "100%" }}
        />
      }
      style={style}
      styles={{ cover: { padding: "8px" }, body: { flex: 1 } }}
    >
      <Flex justify="center" align="center">
        <Typography.Text style={{ textAlign: "center" }} strong>
          {props.title}
        </Typography.Text>
      </Flex>
    </Card>
  );
};
