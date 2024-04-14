import { AutomationContentProps, EmailActions } from "Config/AutomationConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppRichTextEditor } from "DataEntryComponents/AppRichTextEditor";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input, Select, message } from "antd";
import { useEffect } from "react";

export const EmailTemplateForm = (props: AutomationContentProps) => {
  const { collect, data, id } = props;

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (data[id]?.email) {
      form.setFieldsValue(data[id].email);
    } else {
      form.setFieldValue("action", "send");
    }
  }, [form, id, data]);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleSave = () => {
    collect((prev: any) => ({
      ...prev,
      [id]: {
        email: form.getFieldsValue(),
      },
    }));
    messageApi.success("Changes saved successfully");
  };

  return (
    <>
      {contextHolder}

      <AppSpace>
        <AppForm
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
        >
          <Form.Item label="Action" name="action">
            <Select options={EmailActions} />
          </Form.Item>
          <Form.Item label="From" name="from">
            <Input />
          </Form.Item>
          <Form.Item label="To" name="to">
            <Input />
          </Form.Item>
          <Form.Item label="Cc" name="cc">
            <Input />
          </Form.Item>
          <Form.Item label="Bcc" name="bcc">
            <Input />
          </Form.Item>
          <Form.Item label="Subject" name="subject">
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message">
            <AppRichTextEditor />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end">
              <AppButton onClick={handleSave} type="primary">
                Save
              </AppButton>
            </Flex>
          </Form.Item>
        </AppForm>
      </AppSpace>
    </>
  );
};
