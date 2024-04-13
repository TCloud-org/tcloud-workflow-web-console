import { WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppSurfaceTitle } from "DataDisplayComponents/AppSurfaceTitle";
import { CodeDisplay } from "DataDisplayComponents/CodeDisplay";
import { CodeWithToolbar } from "DataDisplayComponents/CodeWithToolbar";
import HttpMethodBadge from "DataDisplayComponents/HttpMethodBadge";
import { Divider, Flex } from "antd";

export const CodeTriggerSteps = () => {
  return (
    <Flex vertical>
      <Divider />
      <Flex vertical gap="16px">
        <AppSurfaceTitle>Endpoint</AppSurfaceTitle>
        <AppSurface size="small">
          <Flex gap="8px" align="center">
            <HttpMethodBadge method="POST" />
            <CodeDisplay
              language="bash"
              code={WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT}
              copyToClipboard
              style={{
                margin: 0,
                paddingRight: "16px",
              }}
            />
          </Flex>
        </AppSurface>
      </Flex>
      <Divider />
      <Flex vertical gap="16px">
        <AppSurfaceTitle>Request</AppSurfaceTitle>
        <AppSurface size="small">
          <CodeDisplay
            code={JSON.stringify({ triggerId: 1 }, null, 4)}
            showLineNumbers
            copyToClipboard
            style={{
              margin: 0,
              paddingRight: "16px",
              paddingLeft: 0,
            }}
          />
        </AppSurface>
      </Flex>
      <Divider />
      <CodeWithToolbar code={JSON.stringify({ triggerId: 1 }, null, 4)} />
    </Flex>
  );
};
