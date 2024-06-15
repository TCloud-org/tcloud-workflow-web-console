import { UserOutlined } from "@ant-design/icons";
import { Avatar, theme } from "antd";

export const AppAvatar = () => {
  const { token } = theme.useToken();

  return (
    <Avatar style={{ backgroundColor: token.colorPrimary }}>
      <UserOutlined />
    </Avatar>
  );
};
