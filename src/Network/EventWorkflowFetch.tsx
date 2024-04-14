import { EventWorkflow } from "Config/EventWorkflowConfig";
import { WOS_GET_EVENT_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import axios from "axios";

export interface GetEventWorkflowsByClientIdOutput {
  workflows: EventWorkflow[];
}

export const getEventWorkflowsByClientId = async (clientId: string) => {
  return await axios
    .get(
      `${WOS_GET_EVENT_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`
    )
    .then((res) => res.data as GetEventWorkflowsByClientIdOutput);
};
