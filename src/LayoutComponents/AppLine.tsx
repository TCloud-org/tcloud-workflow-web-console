import { theme } from "antd";

export const AppLine = () => {
  const { token } = theme.useToken();
  return (
    <div
      style={{
        backgroundColor: token.colorBorderSecondary,
        height: "1px",
        width: "100%",
      }}
    />
  );
};
