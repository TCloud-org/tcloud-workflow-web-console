import { WorkflowUtilities } from "Config/AutomationConfig";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { ApplicationUtility } from "WorkflowAutomationComponents/ApplicationUtility";
import { Col, Flex, Typography } from "antd";

export const WorkflowAutomationPage = () => {
  return (
    <AppSpace>
      <AppSearchInput />
      <Flex vertical gap="16px">
        <Typography.Title level={4}>Email</Typography.Title>
        <AppRow gutter={[16, 16]}>
          {WorkflowUtilities.map((utility, i) => (
            <Col key={i} span={6}>
              <ApplicationUtility utility={utility} />
            </Col>
          ))}
        </AppRow>
      </Flex>
    </AppSpace>
  );
};
