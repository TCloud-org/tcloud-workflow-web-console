import { InternetAddress } from "Config/EMSConfig";
import { Flex, Tag, Typography } from "antd";

export const EmailRecipients = (props: {
  recipients?: InternetAddress[];
  label?: string;
}) => {
  const { recipients = [], label } = props;

  if (recipients.length === 0) {
    return null;
  }

  return (
    <Flex gap={4} wrap="wrap">
      {label && (
        <Typography.Text
          style={{ fontSize: "12px", width: "48px", textAlign: "end" }}
        >
          {`${label}:`}
        </Typography.Text>
      )}
      <Flex wrap="wrap" gap={4} style={{ flex: 1 }}>
        {recipients
          .map((recipient) => recipient.address)
          .map((address, i) => (
            <Tag style={{ margin: 0 }} key={i}>
              {address}
            </Tag>
          ))}
      </Flex>
    </Flex>
  );
};
