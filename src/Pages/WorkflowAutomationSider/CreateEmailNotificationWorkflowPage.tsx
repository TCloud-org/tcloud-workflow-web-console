import {
  AutomationStep,
  EmailNotificationTemplates,
} from "Config/AutomationConfig";
import { WOS_SAVE_EVENT_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EventWorkflowSortableForm } from "WorkflowAutomationComponents/EventWorkflowSortableForm";
import { Flex, Form, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const CreateEmailNotificationWorkflowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const template = searchParams.get("template") || "blank";
  const [form] = Form.useForm();
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const [messageApi, contextHolder] = message.useMessage();

  const [steps, setSteps] = useState<AutomationStep[]>(
    EmailNotificationTemplates[template]
  );
  const [createLoading, setCreateLoading] = useState<boolean>(false);

  useEffect(() => {
    steps.forEach((step) => {
      form.setFieldValue("workflow", {
        ...form.getFieldValue("workflow"),
        [step.id]: {
          [step.key]: {
            ...step.initial,
          },
        },
      });
    });
  }, [form, steps]);

  const comparator = (a: [string, any], b: [string, any]): number => {
    const aIndex = steps.findIndex((item) => item.id === a[0]);
    const bIndex = steps.findIndex((item) => item.id === b[0]);
    return aIndex - bIndex;
  };

  const handleCreate = async () => {
    setCreateLoading(true);

    const orders: any[] = Object.entries(form.getFieldValue("workflow"))
      .sort(comparator)
      .map(([k, v]) => ({
        type: Object.keys(v as any)[0].toUpperCase(),
        form: {
          id: k,
          type: Object.keys(v as any)[0],
          ...(v as any)[Object.keys(v as any)[0]],
        },
      }));
    const params = {
      eventWorkflow: {
        clientId,
        name: form.getFieldValue("name"),
        metadata: {
          steps: orders,
        },
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios
      .post(WOS_SAVE_EVENT_WORKFLOW_ENDPOINT, params, config)
      .then((response) => {
        if (response.data) {
          navigate("/workflow-automation/email-notification-workflow");
        }
      })
      .catch((_) => {
        messageApi.error("Error occurred while creating the workflow");
      });

    setCreateLoading(false);
  };

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  return (
    <>
      {contextHolder}
      <AppSpace>
        <PageTitle>Create Email Notification Workflow</PageTitle>

        <AppForm
          form={form}
          onValuesChange={handleValuesChange}
          layout="vertical"
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>

          <Form.Item name="workflow" label="Workflow">
            <EventWorkflowSortableForm steps={steps} setSteps={setSteps} />
          </Form.Item>

          <Flex justify="flex-end" align="center">
            <Form.Item>
              <AppButton
                loading={createLoading}
                onClick={handleCreate}
                type="primary"
              >
                Create
              </AppButton>
            </Form.Item>
          </Flex>
        </AppForm>
      </AppSpace>
    </>
  );
};
