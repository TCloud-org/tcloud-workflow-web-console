import { AutomationStep, TemplateComponent } from "Config/AutomationConfig";
import {
  EventWorkflow,
  EventWorkflowStepType,
} from "Config/EventWorkflowConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { getEventWorkflowById } from "Network/EventWorkflowFetch";
import { formatDate } from "Utils/DateUtils";
import { EventWorkflowSortableForm } from "WorkflowAutomationComponents/EventWorkflowSortableForm";
import { Flex, List } from "antd";
import { ListItemMetaProps } from "antd/es/list";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EmailNotificationWorkflowDetailPage = () => {
  const { id } = useParams();

  const [eventWorkflow, setEventWorkflow] = useState<EventWorkflow>();
  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<AutomationStep[]>([]);
  const [formData, setFormData] = useState<any>({});

  const fetchEventWorkflow = useCallback(async () => {
    if (id) {
      setLoading(true);
      const res = await getEventWorkflowById(id);
      setEventWorkflow(res.eventWorkflow);
      updateEventWorkflowAttributes(res.eventWorkflow);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventWorkflow();
  }, [fetchEventWorkflow]);

  const updateEventWorkflowAttributes = (data: EventWorkflow) => {
    const initialSteps = data?.metadata.steps
      .map((step) => step.type.toLowerCase())
      .map((type) => TemplateComponent[type])
      .map((step) => ({ ...step, removable: false }));
    const initialFormData: any = initialSteps
      .map((step) => step.id)
      .reduce((res: any, id, i) => {
        res[id] = {
          [EventWorkflowStepType[
            data.metadata.steps[
              i
            ].type.toString() as keyof typeof EventWorkflowStepType
          ]]: data.metadata.steps[i].form,
        };
        return res;
      }, {});
    setSteps(initialSteps);
    setFormData(initialFormData);
  };

  return (
    <AppSpace loading={loading}>
      <PageTitle>{eventWorkflow?.name}</PageTitle>
      <List
        itemLayout="horizontal"
        dataSource={
          [
            {
              title: "ID",
              description: (
                <Flex align="center" gap="4px">
                  {eventWorkflow?.id}
                  <AppCopy
                    type="text"
                    size="small"
                    content={eventWorkflow?.id.toString() || ""}
                  />
                </Flex>
              ),
            },
            {
              title: "Workflow",
              description: (
                <EventWorkflowSortableForm
                  steps={steps}
                  setSteps={setSteps}
                  formData={formData}
                  setFormData={setFormData}
                />
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
    </AppSpace>
  );
};
