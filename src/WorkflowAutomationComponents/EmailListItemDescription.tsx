import { Email } from "Config/EMSConfig";
import { formatDate, getTime, prettifyDate } from "Utils/DateUtils";
import { Flex, Tag, Typography } from "antd";

export const EmailListItemDescription = (props: { email: Email }) => {
  const { email } = props;
  return (
    <Flex justify="space-between" align="flex-start">
      <Flex gap="4px">
        <Typography.Text>To:</Typography.Text>
        <Flex wrap="wrap">
          {email.recipients
            .map((recipient) => recipient.address)
            .map((address, i) => (
              <Tag color="geekblue" key={i}>
                {address}
              </Tag>
            ))}
        </Flex>
      </Flex>
      <Flex vertical align="flex-end">
        <Typography.Text>
          {prettifyDate(formatDate(email.sentAt) || "")}
        </Typography.Text>
        <Typography.Text>{getTime(email.sentAt)}</Typography.Text>
      </Flex>
    </Flex>
  );
};
