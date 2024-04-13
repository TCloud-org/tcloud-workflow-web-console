import { DelayOptions } from "Config/AutomationConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Select, message } from "antd";
import { useEffect, useState } from "react";

export const DelayForm = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [extraForms, setExtraForms] = useState<any[]>([]);

  useEffect(() => {
    form.setFieldValue("delay", "none");
  }, [form]);

  const handleSave = () => {
    console.log(form.getFieldsValue());
    messageApi.success("Changes saved successfully");
  };

  const handleValuesChange = (changes: any, values: any) => {
    if (changes.delay && changes.delay === "custom") {
      setExtraForms(
        DelayOptions.find((item) => item.value === changes.delay)?.inputs
      );
    } else {
      setExtraForms([]);
    }
    form.setFieldsValue(values);
  };

  return (
    <>
      {contextHolder}

      <AppForm
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
      >
        <Form.Item name="delay" label="Delay">
          <Select options={DelayOptions} />
        </Form.Item>
        {extraForms.map((input, i) => (
          <Form.Item label={input.label} name={["custom", input.value]} key={i}>
            {input.render()}
          </Form.Item>
        ))}
        <Flex justify="flex-end">
          <Form.Item>
            <AppButton onClick={handleSave} type="primary">
              Save
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </>
  );
};
