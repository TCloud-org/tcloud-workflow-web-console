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
import { Flex, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const CreateEmailNotificationWorkflowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const template = searchParams.get("template") || "blank";
  const [form] = Form.useForm();
  const clientId = useSelector((state: any) => state.client.clientId);

  const [formData, setFormData] = useState<any>({});
  const [steps, setSteps] = useState<AutomationStep[]>(
    EmailNotificationTemplates[template]
  );

  const comparator = (a: [string, any], b: [string, any]): number => {
    const aIndex = steps.findIndex((item) => item.id === a[0]);
    const bIndex = steps.findIndex((item) => item.id === b[0]);
    return aIndex - bIndex;
  };

  const handleCreate = async () => {
    const orders: any[] = Object.entries(formData)
      .sort(comparator)
      .map((e) => e[1])
      .map((v) => ({
        type: Object.keys(v as any)[0].toUpperCase(),
        form: {
          type: Object.keys(v as any)[0],
          ...(v as any)[Object.keys(v as any)[0]],
        },
      }));
    const params = {
      clientId,
      name: form.getFieldValue("name"),
      steps: orders,
    };
    await axios
      .post(WOS_SAVE_EVENT_WORKFLOW_ENDPOINT, params)
      .then((response) => {
        if (response.data) {
          navigate("/workflow-automation/email-notification-workflow");
        }
      })
      .catch((_) => {});
  };

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  return (
    <AppSpace>
      <PageTitle>Create Email Notification Workflow</PageTitle>

      <AppForm form={form} onValuesChange={handleValuesChange}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>

        <EventWorkflowSortableForm
          formData={formData}
          setFormData={setFormData}
          steps={steps}
          setSteps={setSteps}
        />

        <Flex justify="flex-end" align="center">
          <Form.Item>
            <AppButton onClick={handleCreate} type="primary">
              Create
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
