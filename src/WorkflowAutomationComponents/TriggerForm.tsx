import { TriggerMethods } from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { Form, Select } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { CodeTriggerSteps } from "./CodeTriggerSteps";
import { AppSpace } from "LayoutComponents/AppSpace";

export const TriggerForm = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    form.setFieldValue("method", "code");
    setContent(<CodeTriggerSteps />);
  }, [form]);

  const handleValuesChange = (changes: any, values: any) => {
    if (changes.method && changes.method === "code") {
      setContent(<CodeTriggerSteps />);
    }
    form.setFieldsValue(values);
  };

  return (
    <AppSpace>
      <AppForm
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        <Form.Item label="Method" name="method">
          <Select options={TriggerMethods} />
        </Form.Item>
      </AppForm>
      {content}
    </AppSpace>
  );
};
