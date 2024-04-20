import { AutomationContentProps, EmailActions } from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppRichTextEditor } from "DataEntryComponents/AppRichTextEditor";
import { AppChipInput } from "DataEntryComponents/Form/AppChipInput";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Form, Input, Select } from "antd";
import { useEffect } from "react";

export const EmailTemplateForm = (props: AutomationContentProps) => {
  const { collect, data, id } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (data && data[id]?.email) {
      form.setFieldsValue(data[id].email);
    } else {
      form.setFieldValue("action", "send");
    }
  }, [form, id, data]);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
    collect({
      ...data,
      [id]: {
        email: values,
      },
    });
  };

  return (
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
          <AppChipInput />
        </Form.Item>
        <Form.Item label="Cc" name="cc">
          <AppChipInput />
        </Form.Item>
        <Form.Item label="Bcc" name="bcc">
          <AppChipInput />
        </Form.Item>
        <Form.Item label="Subject" name="subject">
          <Input />
        </Form.Item>
        <Form.Item label="Message" name="message">
          <AppRichTextEditor />
        </Form.Item>
      </AppForm>
    </AppSpace>
  );
};
