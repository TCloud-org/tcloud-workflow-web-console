import { Email } from "Config/EMSConfig";
import { formatDate, getTime, prettifyDate } from "Utils/DateUtils";
import { Col, Flex, Typography } from "antd";
import { EmailRecipients } from "./EmailRecipients";
import { AppRow } from "LayoutComponents/AppRow";

export const EmailListItemDescription = (props: { email: Email }) => {
  const { email } = props;
  return (
    <Flex justify="space-between" align="flex-start">
      <Flex vertical gap="8px" style={{ flex: 4 }}>
        <AppRow gutter={[16, 16]} style={{ margin: 0, padding: 0 }}>
          <Col span={24}>
            <EmailRecipients
              recipients={[{ address: email.sender }]}
              label="From"
            />
          </Col>
          {email.recipients && email.recipients.length > 0 && (
            <Col span={24}>
              <EmailRecipients recipients={email.recipients} label="To" />
            </Col>
          )}
          {email.cc && email.cc.length > 0 && (
            <Col span={24}>
              <EmailRecipients recipients={email.cc} label="Cc" />
            </Col>
          )}
          {email.bcc && email.bcc.length > 0 && (
            <Col span={24}>
              <EmailRecipients recipients={email.bcc} label="Bcc" />
            </Col>
          )}
        </AppRow>
      </Flex>
      <Flex vertical align="flex-end" style={{ flex: 1 }}>
        <Typography.Text>
          {prettifyDate(formatDate(email.sentAt) || "")}
        </Typography.Text>
        <Typography.Text>{getTime(email.sentAt)}</Typography.Text>
      </Flex>
    </Flex>
  );
};
