import { ReloadOutlined } from "@ant-design/icons";
import {
  AutomationStep,
  TemplateComponent,
  TemplateComponentProps,
  borderColor,
} from "Config/AutomationConfig";
import {
  EventWorkflowStage,
  EventWorkflowStatus,
} from "Config/EventWorkflowConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { getEventWorkflowStages } from "Network/EventWorkflowFetch";
import { EventWorkflowSortableForm } from "WorkflowAutomationComponents/EventWorkflowSortableForm";
import { Flex, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const EmailNotificationJobPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const clientId = useSelector((state: any) => state.client.clientId);

  const [stages, setStages] = useState<EventWorkflowStage[]>([]);
  const [steps, setSteps] = useState<AutomationStep[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const fetchStages = useCallback(async () => {
    if (clientId && id) {
      setLoading(true);
      const res = await getEventWorkflowStages(parseInt(id), clientId);
      setStages(res.stages);
      setLoading(false);
    }
  }, [clientId, id]);

  useEffect(() => {
    const currentSteps = stages
      .map((stage) => stage.step)
      .map((step) => step.type.toLowerCase())
      .map((type) => TemplateComponent[type as keyof TemplateComponentProps])
      .map((step, i) => ({
        ...step,
        removable: false,
        status: stages[i].status,
      }));
    setSteps(currentSteps);
    setCompleted(
      stages?.[stages.length - 1]?.status === EventWorkflowStatus.COMPLETED
    );
  }, [stages]);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  return (
    <AppSpace loading={loading}>
      <PageTitle
        endDecorator={
          <AppIconButton onClick={fetchStages} type="primary">
            <ReloadOutlined />
          </AppIconButton>
        }
      >
        <Flex align="center" gap={16}>
          {`Job #${id}`}
          {completed && <Tag color={borderColor}>Completed</Tag>}
        </Flex>
      </PageTitle>
      <EventWorkflowSortableForm steps={steps} showAdd={false} />
    </AppSpace>
  );
};
