export const getMarkdown = (): Blob => {
  const md = `# Email Notification Workflow API Documentation

## Endpoint
This endpoint allows you to trigger an email notification workflow within the system. Email notification workflows are automated processes that send out emails based on predefined conditions or events. By calling this endpoint with the appropriate parameters, you can initiate the execution of a specific email notification workflow.
\`\`\`bash
POST http://52.41.91.140:80/api/private/v1/trigger-email-notification-workflow
\`\`\`

## Request Body
The request body should contain the following parameters:

| Property | Description | Type | Required |
| --- | --- | --- | --- |
| triggerId | An integer representing the unique identifier of the trigger associated with the email notification workflow to be executed. The system will use this trigger ID to identify the specific workflow to be triggered. | Number | true |

### Example Request Body Model:
\`\`\`json
{
    "triggerId": "<INSERT_ID>"
}
\`\`\`

## Response Codes
The endpoint may return the following response codes:

| Code | Status | Description |
| --- | --- | --- |
| 200 | OK | The email notification workflow has been successfully triggered. The system will initiate the execution of the specified workflow based on the provided trigger ID. |
| 400 | Bad Request | The request body is invalid or missing required parameters. Ensure that the request body contains the triggerId parameter and that it is formatted correctly. |
| 401 | Unauthorized | Authentication is required to access this endpoint. Ensure that you are authenticated and have the necessary permissions to trigger email notification workflows. |
| 500 | Internal Server Error | An error occurred on the server while processing the request. If you encounter this error, please contact the system administrator for assistance. |

## Integration
### Example:
\`\`\`bash
curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"triggerId": 1}' \
        http://52.41.91.140:80/api/private/v1/trigger-email-notification-workflow
\`\`\`
In this example, a POST request is made to the endpoint [http://52.41.91.140:80/api/private/v1/trigger-email-notification-workflow](http://52.41.91.140:80/api/private/v1/trigger-email-notification-workflow) with a JSON request body containing the trigger ID 1.

If you're creating a new workflow, a trigger ID will be provided upon successful creation.
    `;
  return new Blob([md], { type: "text/markdown" });
};
