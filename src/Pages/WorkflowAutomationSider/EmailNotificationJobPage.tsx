import { AutomationStep, TemplateComponent } from "Config/AutomationConfig";
import { EventWorkflowStage } from "Config/EventWorkflowConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { getEventWorkflowStages } from "Network/EventWorkflowFetch";
import { EventWorkflowSortableForm } from "WorkflowAutomationComponents/EventWorkflowSortableForm";
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

  const fetchStages = useCallback(async () => {
    if (clientId && id) {
      const res = await getEventWorkflowStages(parseInt(id), clientId);
      setStages(res.stages);
    }
  }, [clientId, id]);

  useEffect(() => {
    const currentSteps = stages
      .map((stage) => stage.step)
      .map((step) => step.type.toLowerCase())
      .map((type) => TemplateComponent[type])
      .map((step, i) => ({
        ...step,
        removable: false,
        status: stages[i].status,
      }));
    setSteps(currentSteps);
  }, [stages]);

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  return (
    <AppSpace>
      <PageTitle>{`Job #${id}`}</PageTitle>
      <EventWorkflowSortableForm steps={steps} showAdd={false} />
    </AppSpace>
  );
};
