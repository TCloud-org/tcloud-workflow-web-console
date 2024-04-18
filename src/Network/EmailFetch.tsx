import { Email } from "Config/EMSConfig";
import { EMS_QUERY_EMAILS_SENT_PER_WORKFLOW_ENDPOINT } from "Config/EMSEndpointConfig";
import axios from "axios";

export interface QueryEmailsSentPerWorkflowResponse {
  emails: Email[];
}

export const queryEmailsPerWorkflow = async (
  from: string,
  workflowId: number
) => {
  const formData = {
    from,
    workflowId,
  };
  return await axios
    .post(EMS_QUERY_EMAILS_SENT_PER_WORKFLOW_ENDPOINT, formData)
    .then((res) => res.data as QueryEmailsSentPerWorkflowResponse);
};
