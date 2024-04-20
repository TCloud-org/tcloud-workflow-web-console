import { Email } from "Config/EMSConfig";
import { Flex } from "antd";
import parse from "html-react-parser";

export const EmailListItemContent = (props: { email: Email }) => {
  const { email } = props;
  return (
    <Flex vertical gap="8px">
      <div>{parse(email.body)}</div>
    </Flex>
  );
};
