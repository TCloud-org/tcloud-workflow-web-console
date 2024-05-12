import { EventWorkflow, EventWorkflowStage } from "Config/EventWorkflowConfig";
import {
  WOS_GET_EVENT_WORKFLOWS_BY_CLIENT_ID_ENDPOINT,
  WOS_GET_EVENT_WORKFLOW_BY_ID_ENDPOINT,
  WOS_GET_EVENT_WORKFLOW_STAGES_ENDPOINT,
} from "Config/WOSEndpointConfig";
import axios from "axios";

export interface GetEventWorkflowsByClientIdOutput {
  workflows: EventWorkflow[];
}

export interface GetEventWorkflowByIdOutput {
  eventWorkflow: EventWorkflow;
}

export interface GetEventWorkflowStagesOutput {
  stages: EventWorkflowStage[];
}

export const getEventWorkflowsByClientId = async (
  clientId: string,
  token: string
) => {
  return await axios
    .get(
      `${WOS_GET_EVENT_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data as GetEventWorkflowsByClientIdOutput);
};

export const getEventWorkflowById = async (
  id: number | string,
  token: string
) => {
  return await axios
    .get(`${WOS_GET_EVENT_WORKFLOW_BY_ID_ENDPOINT}?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as GetEventWorkflowByIdOutput);
};

export const getEventWorkflowStages = async (
  jobId: number,
  clientId: string,
  token: string
) => {
  const formData = {
    jobId,
    clientId,
  };
  return await axios
    .post(WOS_GET_EVENT_WORKFLOW_STAGES_ENDPOINT, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as GetEventWorkflowStagesOutput);
};
