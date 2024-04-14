import {
  AutomationContentProps,
  TriggerMethods,
} from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Select } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { CodeTriggerSteps } from "./CodeTriggerSteps";

export const TriggerForm = (props: AutomationContentProps) => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    form.setFieldValue("method", "api");
    setContent(<CodeTriggerSteps />);
  }, [form]);

  const handleValuesChange = (changes: any, values: any) => {
    if (changes.method === "api") {
      setContent(<CodeTriggerSteps />);
    } else if (changes.method === "webhook") {
      setContent(undefined);
    } else {
      setContent(undefined);
    }
    form.setFieldsValue(values);
  };

  return (
    <Flex style={{ overflow: "auto" }} vertical gap="24px">
      <AppForm
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        <Form.Item label="Method" name="method" style={{ margin: 0 }}>
          <Select options={TriggerMethods} />
        </Form.Item>
      </AppForm>
      {content}
    </Flex>
  );
};
