import { AutomationContentProps, EmailActions } from "Config/AutomationConfig";
import { WOS_SAVE_EVENT_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input, Select, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { HtmlEditorWithPreview } from "./HtmlEditorWithPreview";
import { useSelector } from "react-redux";

export const EmailTemplateForm = (props: AutomationContentProps) => {
  const { collect, data, id, disabled, eventWorkflow, index } = props;

  const authToken = useSelector((state: any) => state.auth.token);

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
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const res = await axios
      .post(WOS_SAVE_EVENT_WORKFLOW_ENDPOINT, formData, config)
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
          <Form.Item label="Subject" name="subject">
            <Input />
          </Form.Item>
          <Form.Item label="Body" name={["message", "html"]}>
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
