import { Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RetryInput,
  RetryPolicy,
  RetryPolicyOptions,
  RetryPolicyOptionsProps,
} from "../../Config/RetryConfig";
import { WOS_SAVE_RETRY_POLICY_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";

export const AddRetryPolicyPage = () => {
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const [form] = Form.useForm();

  const [inputs, setInputs] = useState<RetryInput[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleAdd = async () => {
    setLoading(true);

    const params = {
      retryPolicy: {
        clientId,
        ...form.getFieldsValue(),
      } as RetryPolicy,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios
      .post(WOS_SAVE_RETRY_POLICY_ENDPOINT, params, config)
      .then((_) => navigate("/retry-policy"))
      .catch((err) => console.error(err));

    setLoading(false);
  };

  return (
    <AppSpace>
      <PageTitle>Add a retry policy</PageTitle>

      <AppForm form={form} onValuesChange={handleValuesChange}>
        <Form.Item label="Policy" name="policyType">
          <Select
            options={Object.values(RetryPolicyOptions)
              .sort((a, b) => a.order - b.order)
              .map((option) => ({
                label: option.label,
                value: option.value.type,
              }))}
            placeholder="Select a policy"
          />
        </Form.Item>
        {inputs.map((input, i) => (
          <Form.Item
            key={i}
            label={input.label}
            name={input.value}
            rules={[{ required: true, message: "Missing required field" }]}
          >
            {input.type === "number" ? (
              <InputNumber style={{ width: "100%" }} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}

        <Form.Item noStyle>
          <AppButton type="primary" loading={loading} onClick={handleAdd}>
            Add
          </AppButton>
        </Form.Item>
      </AppForm>
    </AppSpace>
  );
};
