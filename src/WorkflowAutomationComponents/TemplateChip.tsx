import { borderColor } from "Config/AutomationConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { Flex, Typography, theme } from "antd";
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
    <AppCard
      onClick={props.onClick}
      cover={
        <img
          alt="template"
          src={props.src}
          style={{
            height: "20vh",
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: 16,
          }}
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
    </AppCard>
  );
};
