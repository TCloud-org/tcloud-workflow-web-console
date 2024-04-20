import {
  AutomationContentProps,
  TriggerMethods,
} from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Select } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { CodeTriggerSteps } from "./CodeTriggerSteps";

export const TriggerForm = (props: AutomationContentProps) => {
  const { id, collect, data } = props;
  const [form] = Form.useForm();
  const [content, setContent] = useState<ReactNode>();
  const [firstRender, setFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (firstRender) {
      form.setFieldValue("method", "API");
      collect({
        ...data,
        [id]: {
          trigger: form.getFieldsValue(),
        },
      });
      setContent(<CodeTriggerSteps />);
      setFirstRender(false);
    }
  }, [form, id, collect, data, firstRender]);

  const handleValuesChange = (changes: any, values: any) => {
    if (changes.method === "API") {
      setContent(<CodeTriggerSteps />);
    } else if (changes.method === "WEBHOOK") {
      setContent(undefined);
    } else {
      setContent(undefined);
    }
    form.setFieldsValue(values);
    collect({
      ...data,
      [id]: {
        trigger: values,
      },
    });
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
