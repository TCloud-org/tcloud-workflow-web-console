import { Form, Input, InputNumber, Select } from "antd";
import { StepContentProps } from "../../Config/DataDisplayInterface";
import {
  RetryInput,
  RetryPolicyOption,
  RetryPolicyOptions,
  RetryPolicyOptionsProps,
} from "../../Config/RetryConfig";
import { AppStepContentBox } from "../../DataDisplayComponents/AppStepContentBox";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { useEffect, useState } from "react";

export const AddRetryPolicyStep = (props: StepContentProps) => {
  const { form, formData, stepKey } = props;

  const [inputs, setInputs] = useState<RetryInput[]>([]);

  useEffect(() => {
    if (form) {
      const policyType = form.getFieldValue("policyType");
      if (policyType) {
        form.setFieldsValue({
          ...formData[stepKey],
          policyType,
        });
        setInputs(
          RetryPolicyOptions[policyType as keyof RetryPolicyOptionsProps].value
            .inputs
        );
      }
    }
  }, [form, formData, stepKey]);

  const handleValuesChange = (event: any) => {
    const [key, value] = Object.entries(event)[0];
    if (key === "policyType") {
      form.resetFields();
      form.setFieldsValue({
        policyType: value as string,
      });
      setInputs(
        RetryPolicyOptions[value as keyof RetryPolicyOptionsProps].value.inputs
      );
    } else {
      form.setFieldsValue(event);
    }
  };

  return (
    <AppStepContentBox title="Retry Policy">
      <AppForm form={form} onValuesChange={handleValuesChange}>
        <Form.Item label="Policy" name="policyType">
          <Select
            options={Object.values(RetryPolicyOptions)
              .sort((a, b) => a.order - b.order)
              .map((option: RetryPolicyOption) => ({
                label: option.label,
                value: option.value.type,
                disabled: option.disabled,
              }))}
            placeholder="Select a policy"
          />
        </Form.Item>
        {inputs.map((input, i) => (
          <Form.Item key={i} label={input.label} name={input.value}>
            {input.type === "number" ? (
              <InputNumber style={{ width: "100%" }} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}
      </AppForm>
    </AppStepContentBox>
  );
};
