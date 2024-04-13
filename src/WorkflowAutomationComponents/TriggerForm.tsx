import { TriggerMethods } from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { Form, Select } from "antd";
import { useEffect } from "react";

export const TriggerForm = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue("method", "code");
  }, [form]);

  return (
    <AppForm form={form} layout="vertical">
      <Form.Item label="Method" name="method">
        <Select options={TriggerMethods} />
      </Form.Item>
    </AppForm>
  );
};
