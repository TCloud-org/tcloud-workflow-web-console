import { Email } from "Config/EMSConfig";
import { Flex, Typography } from "antd";
import parse from "html-react-parser";

export const EmailListItemContent = (props: { email: Email }) => {
  const { email } = props;
  return (
    <Flex vertical gap="8px">
      <Typography.Text strong>{email.subject}</Typography.Text>
      <div>{parse(email.body)}</div>
    </Flex>
  );
};
