import {
  AutomationStep,
  TemplateComponent,
  TemplateComponentProps,
} from "Config/AutomationConfig";
import { Email } from "Config/EMSConfig";
import {
  EventWorkflow,
  EventWorkflowStepType,
} from "Config/EventWorkflowConfig";
import { WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { DraggableTabs } from "DataDisplayComponents/DraggableTabs";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { queryEmailsPerWorkflow } from "Network/EmailFetch";
import { getEventWorkflowById } from "Network/EventWorkflowFetch";
import { formatDate } from "Utils/DateUtils";
import { EmailList } from "WorkflowAutomationComponents/EmailList";
import { EmailNotificationJobList } from "WorkflowAutomationComponents/EmailNotificationJobList";
import { EventWorkflowSortableForm } from "WorkflowAutomationComponents/EventWorkflowSortableForm";
import { Flex, List } from "antd";
import { ListItemMetaProps } from "antd/es/list";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const transformData = (data: EventWorkflow | undefined) => {
  const initialSteps = (data?.metadata?.steps || [])
    .map((step) => step.type.toLowerCase())
    .map((type) => TemplateComponent[type as keyof TemplateComponentProps])
    .map((step) => ({ ...step, removable: false }));
  const initialFormData: any = initialSteps
    .map((step) => step.id)
    .reduce((res: any, id, i) => {
      res[id] = {
        [EventWorkflowStepType[
          data?.metadata?.steps[
            i
          ].type.toString() as keyof typeof EventWorkflowStepType
        ]]: data?.metadata?.steps[i].form,
      };
      return res;
    }, {});

  return {
    initialSteps,
    initialFormData,
  };
};

export const EmailNotificationWorkflowDetailPage = () => {
  const { id } = useParams();

  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const [eventWorkflow, setEventWorkflow] = useState<EventWorkflow>();
  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<AutomationStep[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [emails, setEmails] = useState<Email[]>([]);
  const [testRunLoading, setTestRunLoading] = useState<boolean>(false);

  const fetchEventWorkflow = useCallback(async () => {
    if (id) {
      setLoading(true);
      const res = await getEventWorkflowById(id, authToken);
      setEventWorkflow(res.eventWorkflow);
      updateEventWorkflowAttributes(res.eventWorkflow);
      setLoading(false);
    }
  }, [id, authToken]);

  const fetchSentEmails = useCallback(async () => {
    if (eventWorkflow) {
      const workflowId = eventWorkflow.id;
      const senders: string[] =
        eventWorkflow?.metadata?.steps
          .filter((step) => (step?.form as any)?.from)
          .map((step) => (step?.form as any)?.from as string) || [];
      senders.forEach(async (sender) => {
        const res = await queryEmailsPerWorkflow(sender, workflowId, authToken);
        setEmails(res.emails);
      });
    }
  }, [eventWorkflow, authToken]);

  useEffect(() => {
    fetchSentEmails();
  }, [fetchSentEmails]);

  useEffect(() => {
    fetchEventWorkflow();
  }, [fetchEventWorkflow]);

  const updateEventWorkflowAttributes = (data: EventWorkflow) => {
    const transformedData = transformData(data);
    setSteps(transformedData.initialSteps);
    setFormData(transformedData.initialFormData);
  };

  const handleTest = async () => {
    setTestRunLoading(true);
    const req = {
      clientId,
      id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios
      .post(WOS_TRIGGER_EMAIL_NOTIFICATION_WORKFLOW_ENDPOINT, req, config)
      .then((res) => res.data);

    setTimeout(() => {
      setTestRunLoading(false);
      // navigate(`${location.pathname}/job?id=${jobId}`);
    }, 2000);
  };

  return (
    <AppSpace loading={loading}>
      <PageTitle>{eventWorkflow?.name}</PageTitle>
      <Flex gap="16px">
        <AppButton onClick={handleTest} type="primary" loading={testRunLoading}>
          Run a test job
        </AppButton>
      </Flex>
      <List
        itemLayout="horizontal"
        dataSource={
          [
            {
              title: "ID",
              description: (
                <Flex align="center" gap="4px">
                  {eventWorkflow?.id}
                  <AppCopy content={eventWorkflow?.id.toString() || ""} />
                </Flex>
              ),
            },
            {
              title: "Created",
              description: formatDate(eventWorkflow?.createdAt),
            },
          ] as ListItemMetaProps[]
        }
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta {...item} />
          </List.Item>
        )}
      />
      <DraggableTabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: "Workflow",
            children: (
              <EventWorkflowSortableForm
                steps={steps}
                setSteps={setSteps}
                value={formData}
                onChange={setFormData}
                showAdd={false}
                eventWorkflow={eventWorkflow}
              />
            ),
          },
          {
            key: "2",
            label: "Jobs",
            children: <EmailNotificationJobList />,
          },
          {
            key: "3",
            label: "Sent",
            children: <EmailList emails={emails} />,
          },
        ]}
      />
    </AppSpace>
  );
};
