import { Checkbox, Form, Input, Select } from "antd";
import { StepContentProps } from "../../Config/DataDisplayInterface";
import { EnvironmentOptions } from "../../Config/WorkflowConfig";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { useState } from "react";
import { AppSpace } from "../../LayoutComponents/AppSpace";

export const ServiceForm = (
  props: StepContentProps & {
    service: string;
    onValuesChange: (e: any) => void;
  }
) => {
  const { form, service, onValuesChange } = props;

  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);

  return (
    <AppSpace>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Already configured?
      </Checkbox>
      <AppForm
        form={form}
        onValuesChange={onValuesChange}
        disabled={componentDisabled}
      >
        <Form.Item
          label="Endpoint"
          name={[service, "baseUrl"]}
          rules={[
            {
              required: true,
              message: "Please enter a service endpoint",
            },
          ]}
        >
          <Input placeholder="Enter a service endpoint" />
        </Form.Item>

        <Form.Item
          label="Environment"
          name={[service, "environment"]}
          rules={[
            {
              required: true,
              message: "Please select an environment",
            },
          ]}
        >
          <Select
            options={EnvironmentOptions}
            placeholder="Select an environment"
          />
        </Form.Item>

        <Form.Item
          label="Alias"
          name={[service, "alias"]}
          tooltip="If this field is left empty, it will be automatically assigned a generated ID"
        >
          <Input placeholder="Enter an alias" />
        </Form.Item>
      </AppForm>
    </AppSpace>
  );
};
