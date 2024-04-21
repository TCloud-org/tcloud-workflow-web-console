import { AppHeadingLink } from "DataDisplayComponents/AppHeadingLink";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { propertyColumns } from "WorkflowAutomationComponents/CodeTriggerSteps";
import { Fragment } from "react/jsx-runtime";

const documentRows = [
  {
    property: "documentId",
    required: false,
    description:
      "This attribute represents the unique identifier associated with the document. It is used to uniquely identify the document within the system.",
    type: "String",
  },
  {
    property: "documentBody",
    required: false,
    description:
      "This attribute represents the content or body of the document. It contains the client entities that are used within a workflow.",
    type: "DocumentBody",
  },
];

const documentBodyRows = [
  {
    property: "entities",
    required: false,
    description:
      "Stores entities within the document as key-value pairs, where each key is a unique identifier and the corresponding value is the entity content added by clients represented as a byte array.",
    type: "Map<String, Byte[]>",
  },
  {
    property: "changeLogs",
    required: false,
    description:
      "Contains a list of change logs documenting modifications made to the document's entities over time.",
    type: "List<DocumentEntityChangeLog>",
  },
];

const documentEntityChangeLogRows = [
  {
    property: "added",
    required: false,
    description:
      "Records entities added to the document, where each key-value pair represents the entity identifier and its content as a byte array.",
    type: "Map<String, Byte[]>",
  },
  {
    property: "removed",
    required: false,
    description:
      "Tracks entities removed from the document, storing the entity identifier and its content as a byte array for each removal.",
    type: "Map<String, Byte[]>",
  },
  {
    property: "modified",
    required: false,
    description:
      "Captures entities that have been modified within the document, storing the identifier and updated content as byte arrays.",
    type: "Map<String, Byte[]>",
  },
  {
    property: "createdAt",
    required: false,
    description:
      "Indicates the date and time when the document entity change log entry was created.",
    type: "ZonedDateTime",
  },
];

const configurationRows = [
  {
    property: "name",
    required: false,
    description:
      "The name of the configuration (e.g., state name, service name).",
    type: "String",
  },
  {
    property: "alias",
    required: true,
    description: "Represents a specific version of a configuration.",
    type: "String",
  },
];

const workflowConfigurationRows = [
  {
    property: "workflowConfigurationId",
    required: true,
    description: "Unique identifier for the workflow configuration.",
    type: "String",
  },
  {
    property: "workId",
    required: true,
    description: "Identifier of the work associated with the configuration.",
    type: "String",
  },
  {
    property: "clientId",
    required: true,
    description: "Client ID associated with the workflow configuration.",
    type: "String",
  },
  {
    property: "workflowVersionConfig",
    required: true,
    description: "Configuration for the version of the workflow.",
    type: "Configuration",
  },
  {
    property: "stateEndpointConfigMap",
    required: true,
    description: "Map of state endpoint configurations.",
    type: "Map<String, Configuration>",
  },
  {
    property: "serviceEndpointConfigMap",
    required: true,
    description: "Map of service endpoint configurations.",
    type: "Map<String, Configuration>",
  },
  {
    property: "workflowRetryConfig",
    required: true,
    description: "Retry configuration for the workflow.",
    type: "RetryConfig",
  },
  {
    property: "stateRetryConfigMap",
    required: true,
    description: "Map of state-specific retry configurations.",
    type: "Map<String, RetryConfig>",
  },
  {
    property: "modifiedAt",
    required: true,
    description: "Date and time when the configuration was last modified.",
    type: "ZonedDateTime",
  },
  {
    property: "version",
    required: true,
    description: "Version number of the workflow configuration.",
    type: "Long",
  },
];

const retryConfigRows = [
  {
    property: "retryPolicyId",
    required: true,
    description: "The unique identifier of the retry policy.",
    type: "Integer",
  },
  {
    property: "retryIndex",
    required: true,
    description:
      "The index representing the retry attempt (e.g., first attempt, second attempt, etc.).",
    type: "Integer",
  },
];

export const models = [
  {
    name: "Configuration",
    rows: configurationRows,
  },
  {
    name: "Document",
    rows: documentRows,
  },
  {
    name: "DocumentBody",
    rows: documentBodyRows,
  },
  {
    name: "DocumentEntityChangeLog",
    rows: documentEntityChangeLogRows,
  },
  {
    name: "WorkflowConfiguration",
    rows: workflowConfigurationRows,
  },
  {
    name: "RetryConfig",
    rows: retryConfigRows,
  },
];

export const ApiWorkflowModelPage = () => {
  const modelComparator = (a: any, b: any) => {
    return a.name.localeCompare(b.name);
  };

  return (
    <AppSpace>
      <PageTitle>Model</PageTitle>

      {models.sort(modelComparator).map((model, i) => (
        <Fragment key={i}>
          <AppHeadingLink level={5}>{model.name}</AppHeadingLink>
          <AppTable
            rows={model.rows}
            columns={propertyColumns}
            showTitle={false}
            showSettings={false}
            showSelected={false}
          />
        </Fragment>
      ))}
    </AppSpace>
  );
};
