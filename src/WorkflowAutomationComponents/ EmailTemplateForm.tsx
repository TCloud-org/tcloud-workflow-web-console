import { AutomationContentProps, EmailActions } from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppChipInput } from "DataEntryComponents/Form/AppChipInput";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";
import { HtmlEditorWithPreview } from "./HtmlEditorWithPreview";
import { AppButton } from "DataEntryComponents/AppButton";
import { WOS_SAVE_EVENT_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import axios from "axios";

export const EmailTemplateForm = (props: AutomationContentProps) => {
  const { collect, data, id, disabled, eventWorkflow, index } = props;

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data && data[id]?.email) {
      form.setFieldsValue(data[id].email);
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

  const handleSave = async () => {
    if (
      !eventWorkflow ||
      !eventWorkflow.metadata ||
      !eventWorkflow.metadata.steps[index] ||
      !eventWorkflow.metadata.steps[index].form
    ) {
      return;
    }
    setLoading(true);

    const savedEventWorkflow = { ...eventWorkflow };
    savedEventWorkflow.metadata.steps[index].form = {
      ...form.getFieldsValue(),
      type: "email",
    };
    const formData = {
      eventWorkflow: savedEventWorkflow,
    };
    const res = await axios
      .post(WOS_SAVE_EVENT_WORKFLOW_ENDPOINT, formData)
      .then((res) => res)
      .catch((err) => err);

    setLoading(false);

    if (res.data) {
      messageApi.success("Saved email form successfully");
    } else {
      messageApi.error("Failed to save email form");
    }
  };

  return (
    <>
      {contextHolder}
      <AppSpace>
        <AppForm
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          disabled={disabled}
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
          <Form.Item label="Body" name="message">
            <HtmlEditorWithPreview disabled={disabled} />
          </Form.Item>
          {eventWorkflow && (
            <Flex justify="flex-end">
              <Form.Item>
                <AppButton
                  loading={loading}
                  type="primary"
                  onClick={handleSave}
                >
                  Save
                </AppButton>
              </Form.Item>
            </Flex>
          )}
        </AppForm>
      </AppSpace>
    </>
  );
};
