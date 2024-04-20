import { InternetAddress } from "Config/EMSConfig";
import { Flex, Tag, Typography } from "antd";

export const EmailRecipients = (props: {
  recipients?: InternetAddress[];
  label?: string;
}) => {
  const { recipients = [], label } = props;
  return (
    <Flex gap={4}>
      {label && (
        <Typography.Text style={{ fontSize: "12px" }}>
          {`${label}:`}
        </Typography.Text>
      )}
      <Flex wrap="wrap">
        {recipients
          .map((recipient) => recipient.address)
          .map((address, i) => (
            <Tag key={i}>{address}</Tag>
          ))}
      </Flex>
    </Flex>
  );
};
