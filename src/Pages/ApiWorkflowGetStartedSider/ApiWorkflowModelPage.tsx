import { Span } from "Config/DataDisplayInterface";
import {
  AppHeadingLink,
  scrollToHash,
} from "DataDisplayComponents/AppHeadingLink";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppSpace } from "LayoutComponents/AppSpace";
import { propertyColumns } from "WorkflowAutomationComponents/CodeTriggerSteps";
import { Flex, Form, Input, Select } from "antd";
import { ReactNode, useCallback, useEffect, useState } from "react";
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
    type: "Long",
  },
  {
    property: "retryIndex",
    required: true,
    description:
      "The index representing the retry attempt (e.g., first attempt, second attempt, etc.).",
    type: "Integer",
  },
];

export interface Model {
  name: string;
  rows: any[];
}

export const models: Model[] = [
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
  const [form] = Form.useForm();
  const [query, setQuery] = useState<string>("");
  const [filter, setFilter] = useState<{ [key: string]: any }>({});

  const setInitialFilter = useCallback(() => {
    form.resetFields();
    form.setFieldValue("operator", "and");
  }, [form]);

  useEffect(() => {
    setInitialFilter();
  }, [setInitialFilter]);

  const modelComparator = (a: any, b: any) => {
    return a.name.localeCompare(b.name);
  };

  const modelFilter = (model: Model): boolean => {
    let queriedModel = query.toLowerCase();
    if (filter?.model) {
      queriedModel = filter.model.toLowerCase();
    }
    return model.name.toLowerCase().includes(queriedModel);
  };

  const rowFilter = (row: any): boolean => {
    const filters = Object.entries(filter)
      .filter(([k, _]) => k !== "operator")
      .filter(([_, v]) => v);

    if (filters.length === 0) {
      return true;
    }

    if (filter.operator === "or") {
      return filters.some(([field, value]) => {
        if (typeof row[field] === "string") {
          return row[field].toLowerCase().includes(value.toLowerCase());
        }
        return row[field] === value;
      });
    }

    return filters.every(([field, value]) => {
      if (typeof row[field] === "string") {
        return row[field].toLowerCase().includes(value.toLowerCase());
      }
      return row[field] === value;
    });
  };

  useEffect(() => {
    scrollToHash();
  }, []);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleClearFilter = () => {
    setInitialFilter();
    setFilter({});
  };

  const handleFilter = () => {
    setFilter(form.getFieldsValue());
  };

  const renderFilter = (): ReactNode => {
    return (
      <AppForm
        form={form}
        labelAlign="left"
        labelCol={Span[6]}
        wrapperCol={Span[1]}
        onValuesChange={handleValuesChange}
      >
        <Form.Item label="Logical operator" name="operator">
          <Select
            options={[
              { value: "and", label: "AND" },
              { value: "or", label: "OR" },
            ]}
          />
        </Form.Item>
        <Form.Item label="Model" name="model">
          <Input />
        </Form.Item>
        <Form.Item label="Property" name="property">
          <Input />
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Input />
        </Form.Item>
        <Form.Item label="Required" name="required">
          <Select
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ]}
          />
        </Form.Item>
        <Form.Item style={{ margin: 0 }}>
          <Flex justify="flex-end" gap={16}>
            <AppButton type="text" onClick={handleClearFilter}>
              Clear filter
            </AppButton>
            <AppButton type="primary" onClick={handleFilter}>
              Search
            </AppButton>
          </Flex>
        </Form.Item>
      </AppForm>
    );
  };

  return (
    <AppSpace>
      <PageTitle>Model</PageTitle>

      <AppSearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        renderFilter={renderFilter()}
      />

      {models
        .filter(modelFilter)
        .filter((model) => model.rows.filter(rowFilter).length > 0)
        .sort(modelComparator)
        .map((model, i) => (
          <Fragment key={i}>
            <AppHeadingLink level={5}>{model.name}</AppHeadingLink>
            <AppTable
              rows={model.rows.filter(rowFilter)}
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
