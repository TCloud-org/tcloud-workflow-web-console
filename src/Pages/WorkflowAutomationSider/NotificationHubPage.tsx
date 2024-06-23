import { WorkflowUtilities } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { ApplicationUtility } from "WorkflowAutomationComponents/ApplicationUtility";
import { Col, Flex, Typography } from "antd";

export const NotificationHubPage = () => {
  return (
    <AppSpace>
      <AppSearchInput />
      <Flex vertical gap="16px">
        <Typography.Title level={4}>Notification Workflows</Typography.Title>
        <AppRow gutter={[16, 16]}>
          {WorkflowUtilities.map((utility, i) => (
            <Col key={i} {...Span[3]}>
              <ApplicationUtility utility={utility} />
            </Col>
          ))}
        </AppRow>
      </Flex>
    </AppSpace>
  );
};
