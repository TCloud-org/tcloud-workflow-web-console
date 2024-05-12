import { EventWorkflowStatus } from "Config/EventWorkflowConfig";
import { WOS_QUERY_JOBS_PER_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import axios from "axios";

export interface QueryJobsPerWorkflowOutput {
  jobs: EventWorkflowJob[];
}

export interface EventWorkflowJob {
  jobId: number;
  workflowId: number;
  clientId: string;
  status: EventWorkflowStatus;
  scheduledAt: string;
  executedAt: string;
}

export const queryJobsByWorkflowId = async (
  workflowId: number | string,
  clientId: string,
  token: string
) => {
  const formData = {
    workflowId,
    clientId,
  };
  return await axios
    .post(WOS_QUERY_JOBS_PER_WORKFLOW_ENDPOINT, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data as QueryJobsPerWorkflowOutput);
};
