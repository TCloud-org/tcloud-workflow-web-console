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
import {
  getEventWorkflowById,
  getEventWorkflowStages,
} from "Network/EventWorkflowFetch";
import { EventWorkflowSortableForm } from "WorkflowAutomationComponents/EventWorkflowSortableForm";
import { Flex, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { transformData } from "./EmailNotificationWorkflowDetailPage";

export const EmailNotificationJobPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get("id");
  const { id } = useParams();

  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const [stages, setStages] = useState<EventWorkflowStage[]>([]);
  const [steps, setSteps] = useState<AutomationStep[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  const fetchStages = useCallback(async () => {
    if (clientId && jobId) {
      setLoading(true);
      const res = await getEventWorkflowStages(
        parseInt(jobId),
        clientId,
        authToken
      );
      setStages(res.stages);
      setLoading(false);
    }
  }, [clientId, jobId, authToken]);

  const fetchEventWorkflow = useCallback(async () => {
    if (id) {
      const res = await getEventWorkflowById(id, authToken);
      const transformedData = transformData(res.eventWorkflow);
      setFormData(transformedData.initialFormData);
    }
  }, [id, authToken]);

  useEffect(() => {
    fetchEventWorkflow();
  }, [fetchEventWorkflow]);

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
          {`Job #${jobId}`}
          {completed && <Tag color={borderColor}>Completed</Tag>}
        </Flex>
      </PageTitle>
      <EventWorkflowSortableForm
        steps={steps}
        showAdd={false}
        disabled
        value={formData}
      />
    </AppSpace>
  );
};
