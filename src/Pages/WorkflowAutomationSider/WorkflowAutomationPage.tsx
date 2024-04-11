import { WorkflowUtilities } from "Config/AutomationConfig";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { ApplicationUtility } from "WorkflowAutomationComponents/ApplicationUtility";
import { Card, Col, Flex, Typography, theme } from "antd";

export const WorkflowAutomationPage = () => {
  const { token } = theme.useToken();

  return (
    <AppSpace>
      <Card bordered={false}>
        <Flex vertical gap="16px">
          <Typography.Text
            style={{ color: token.colorTextDescription, fontSize: "small" }}
          >
            Email
          </Typography.Text>
          <AppRow>
            {WorkflowUtilities.map((utility, i) => (
              <Col key={i}>
                <ApplicationUtility utility={utility} />
              </Col>
            ))}
          </AppRow>
        </Flex>
      </Card>
    </AppSpace>
  );
};
