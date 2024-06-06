import { InternetAddress } from "Config/EMSConfig";
import { Flex, Typography } from "antd";

export const EmailRecipients = (props: {
  recipients?: InternetAddress[];
  label?: string;
}) => {
  const { recipients = [], label } = props;

  if (
    recipients === undefined ||
    recipients === null ||
    recipients.length === 0
  ) {
    return null;
  }

  return (
    <Flex gap={4} wrap="wrap" align="center">
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
            <div style={{ margin: 0 }} key={i} className="text-neutral-7">
              {address}
            </div>
          ))}
      </Flex>
    </Flex>
  );
};
