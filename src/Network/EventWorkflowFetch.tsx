import { EventWorkflow } from "Config/EventWorkflowConfig";
import {
  WOS_GET_EVENT_WORKFLOWS_BY_CLIENT_ID_ENDPOINT,
  WOS_GET_EVENT_WORKFLOW_BY_ID_ENDPOINT,
} from "Config/WOSEndpointConfig";
import axios from "axios";

export interface GetEventWorkflowsByClientIdOutput {
  workflows: EventWorkflow[];
}

export interface GetEventWorkflowByIdOutput {
  eventWorkflow: EventWorkflow;
}

export const getEventWorkflowsByClientId = async (clientId: string) => {
  return await axios
    .get(
      `${WOS_GET_EVENT_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`
    )
    .then((res) => res.data as GetEventWorkflowsByClientIdOutput);
};

export const getEventWorkflowById = async (id: number | string) => {
  return await axios
    .get(`${WOS_GET_EVENT_WORKFLOW_BY_ID_ENDPOINT}?id=${id}`)
    .then((res) => res.data as GetEventWorkflowByIdOutput);
};
