import { Flex, Typography, theme } from "antd";
import { FC } from "react";

interface HttpMethodBadgeProps {
  method?: "POST" | "GET" | "DELETE" | "PUT";
}

const HTTP_METHOD_COLOR_CODE: Record<string, string> = {
  POST: "#6abf69",
  GET: "#7fbfff",
  DELETE: "#f88b8b",
  PUT: "#ffb84d",
};

const HttpMethodBadge: FC<HttpMethodBadgeProps> = ({ method = "POST" }) => {
  const { token } = theme.useToken();
  return (
    <Flex
      style={{
        borderRadius: token.borderRadiusSM,
        backgroundColor: HTTP_METHOD_COLOR_CODE[method],
        color: "white",
        width: "80px",
        height: "32px",
      }}
      align="center"
      justify="center"
    >
      <Typography.Text style={{ color: token.colorWhite }} strong>
        {method}
      </Typography.Text>
    </Flex>
  );
};

export default HttpMethodBadge;
