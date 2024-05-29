import { AppSurface } from "DataDisplayComponents/AppSurface";
import { Flex, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

export const EditRetryPolicyPage = () => {
  const { retryPolicyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const data: RetryPolicy = location.state?.data;

  const [form] = Form.useForm();

  const authToken = useSelector((state: any) => state.auth.token);

  const [inputs, setInputs] = useState<RetryInput[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const policyType =
        data.policyType.toString() as keyof RetryPolicyOptionsProps;
      const inputs = RetryPolicyOptions[policyType].value.inputs;
      setInputs(inputs);
      form.setFieldsValue({
        policyType,
      });
      inputs.forEach((input) => {
        form.setFieldsValue({
          [input.value]: data[input.value],
        });
      });
    }
  }, [data, form]);

  const handleValuesChange = (event: any) => {
    const [key, value] = Object.entries(event)[0];
    form.setFieldsValue({
      [key]: value as string | number,
    });
  };

  const handleEdit = async () => {
    setLoading(true);

    const params = {
      retryPolicy: {
        ...data,
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
      .then((_) => navigate(`/retry-policy/${retryPolicyId}`))
      .catch((_) => {});

    setLoading(false);
  };

  const handleCancel = () => {
    navigate(`/retry-policy/${retryPolicyId}`);
  };

  return (
    <AppSpace>
      <PageTitle>{data.retryPolicyId}</PageTitle>

      <AppSurface type="form">
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
              disabled
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
        </AppForm>

        <Flex justify="center">
          <AppSpace direction="horizontal">
            <AppButton loading={loading} type="primary" onClick={handleEdit}>
              Edit
            </AppButton>
            <AppButton onClick={handleCancel}>Cancel</AppButton>
          </AppSpace>
        </Flex>
      </AppSurface>
    </AppSpace>
  );
};
