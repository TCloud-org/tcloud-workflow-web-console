import { DownloadOutlined } from "@ant-design/icons";
import { EditableColumn } from "Config/LayoutConfig";
import { WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppSurfaceTitle } from "DataDisplayComponents/AppSurfaceTitle";
import { AppTable } from "DataDisplayComponents/AppTable";
import { CodeDisplay } from "DataDisplayComponents/CodeDisplay";
import { CodeWithToolbar } from "DataDisplayComponents/CodeWithToolbar";
import HttpMethodBadge from "DataDisplayComponents/HttpMethodBadge";
import { AppButton } from "DataEntryComponents/AppButton";
import {
  generateCodeSnippets,
  generateModelCodeSnippets,
} from "Utils/CodeUtils";
import { getMarkdown } from "Utils/MarkdownUtils";
import { Divider, Flex, Typography } from "antd";
import FileSaver from "file-saver";

const propertyColumns: EditableColumn[] = [
  {
    title: "Property",
    dataIndex: "property",
    render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Required",
    dataIndex: "required",
    render: (text: boolean) => (text ? "True" : "False"),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const propertyRows = [
  {
    property: "id",
    required: "true",
    description:
      "An integer representing the unique identifier of the trigger associated with the email notification workflow to be executed. The system will use this trigger ID to identify the specific workflow to be triggered.",
    type: "integer",
  },
];

const responseCodeColumns: EditableColumn[] = [
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
];

const responseCodeRows = [
  {
    code: 200,
    status: "OK",
    description:
      "The email notification workflow has been successfully triggered. The system will initiate the execution of the specified workflow based on the provided trigger ID.",
  },
  {
    code: 400,
    status: "Bad Request",
    description:
      "The request body is invalid or missing required parameters. Ensure that the request body contains the triggerId parameter and that it is formatted correctly.",
  },
  {
    code: 401,
    status: "Unauthorized",
    description:
      "Authentication is required to access this endpoint. Ensure that you are authenticated and have the necessary permissions to trigger email notification workflows.",
  },
  {
    code: 500,
    status: "Internal Server Error",
    description:
      "An error occurred on the server while processing the request. If you encounter this error, please contact the system administrator for assistance.",
  },
];

export const CodeTriggerSteps = () => {
  const baseUrl =
    window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "");
  const handleDownloadMarkdown = () => {
    const blob = getMarkdown();
    FileSaver.saveAs(blob, "README.md");
  };

  return (
    <Flex vertical>
      <Flex justify="space-between" align="center">
        <AppSurfaceTitle>API Reference</AppSurfaceTitle>
        <AppButton
          onClick={handleDownloadMarkdown}
          type="primary"
          icon={<DownloadOutlined />}
        >
          Export to Markdown
        </AppButton>
      </Flex>
      <Divider />
      <Flex vertical gap="16px">
        <AppSurfaceTitle>Endpoint</AppSurfaceTitle>
        <Typography.Paragraph style={{ margin: 0 }}>
          This endpoint allows you to trigger an email notification workflow
          within the system. Email notification workflows are automated
          processes that send out emails based on predefined conditions or
          events. By calling this endpoint with the appropriate parameters, you
          can initiate the execution of a specific email notification workflow.
        </Typography.Paragraph>
        <AppSurface size="small">
          <Flex justify="space-between" align="center">
            <Flex gap="12px" align="center">
              <HttpMethodBadge method="POST" />
              <CodeDisplay
                language="bash"
                code={WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT}
                style={{
                  paddingRight: "16px",
                }}
              />
            </Flex>
            <AppCopy
              type="text"
              size="small"
              content={WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT}
            />
          </Flex>
        </AppSurface>
      </Flex>
      <Divider />
      <Flex vertical gap="16px">
        <AppSurfaceTitle>Request Body</AppSurfaceTitle>
        <Typography.Paragraph>
          The request body should contain the following parameters:
        </Typography.Paragraph>
        <AppTable
          showSelected={false}
          columns={propertyColumns}
          rows={propertyRows}
          rowId="property"
          showSettings={false}
          showHeader={false}
          showTitle={false}
        />

        <CodeWithToolbar
          snippets={generateModelCodeSnippets({ id: "<INSERT_ID>" })}
        />
      </Flex>
      <Divider />
      <Flex vertical gap="16px">
        <AppSurfaceTitle>Response Codes</AppSurfaceTitle>

        <Typography.Paragraph>
          The endpoint may return the following response codes:
        </Typography.Paragraph>

        <AppTable
          showSelected={false}
          columns={responseCodeColumns}
          rows={responseCodeRows}
          rowId="property"
          showSettings={false}
          showHeader={false}
          showTitle={false}
        />
      </Flex>
      <Divider />
      <Flex vertical gap="16px">
        <AppSurfaceTitle>Integration</AppSurfaceTitle>
        <Typography.Text>Example:</Typography.Text>
        <CodeWithToolbar
          snippets={generateCodeSnippets(
            WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT,
            { triggerId: 1 }
          )}
        />
        <Typography.Paragraph>
          In this example, a POST request is made to the endpoint{" "}
          <a href="http://52.41.91.140:80/api/private/v1/trigger-email-notification-workflow">
            http://52.41.91.140:80/api/private/v1/trigger-email-notification-workflow
          </a>{" "}
          with a JSON request body containing the ID 1.
        </Typography.Paragraph>
        <Typography.Paragraph>
          If you're creating a new workflow, an ID will be provided upon
          successful creation. To claim the newly created workflow ID, go to{" "}
          <a
            href={`${baseUrl}/workflow-automation/email-notification-workflow`}
          >{`${baseUrl}/workflow-automation/email-notification-workflow`}</a>
        </Typography.Paragraph>
      </Flex>
    </Flex>
  );
};
