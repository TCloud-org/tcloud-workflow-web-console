import {
  AutomationContentProps,
  TriggerMethods,
} from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Select } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { CodeTriggerSteps } from "./CodeTriggerSteps";

export const TriggerForm = (props: AutomationContentProps) => {
  const { id, collect } = props;
  const [form] = Form.useForm();
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    form.setFieldValue("method", "API");
    collect((prev: any) => ({
      ...prev,
      [id]: {
        trigger: form.getFieldsValue(),
      },
    }));
    setContent(<CodeTriggerSteps />);
  }, [form, id, collect]);

  const handleValuesChange = (changes: any, values: any) => {
    if (changes.method === "API") {
      setContent(<CodeTriggerSteps />);
    } else if (changes.method === "WEBHOOK") {
      setContent(undefined);
    } else {
      setContent(undefined);
    }
    form.setFieldsValue(values);
    collect((prev: any) => ({
      ...prev,
      [id]: {
        trigger: values,
      },
    }));
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
