import axios from "axios";
import {
  WOS_GET_WORKS_BY_CLIENT_ID_AND_WORKFLOW_ID_ENDPOINT,
  WOS_GET_WORKS_IN_DATE_RANGE_ENDPOINT,
  WOS_GET_WORK_STATISTIC_IN_DATE_RANGE_ENDPOINT,
  WOS_QUERY_WORKS_ENDPOINT,
} from "../Config/WOSEndpointConfig";
import {
  GetWorkStatisticInDateRangeOutput,
  GetWorksByClientIdAndWorkflowIdOutput,
  GetWorksInDateRangeOutput,
  QueryWorksOutput,
} from "../Config/WorkflowConfig";

export const getWorksByClientIdAndWorkflowId = async (
  clientId: string,
  workflowId: string
): Promise<GetWorksByClientIdAndWorkflowIdOutput> => {
  const params = new URLSearchParams();
  params.set("clientId", clientId);
  params.set("workflowId", workflowId);
  return await axios
    .get(`${WOS_GET_WORKS_BY_CLIENT_ID_AND_WORKFLOW_ID_ENDPOINT}?${params}`)
    .then((res) => res.data as GetWorksByClientIdAndWorkflowIdOutput);
};

export const getWorksInDateRange = async (
  clientId: string,
  workflowId: string,
  start?: string,
  end?: string,
  period?: string
): Promise<GetWorksInDateRangeOutput> => {
  const formData = {
    clientId,
    workflowId,
    start: start ? new Date(start).toISOString() : undefined,
    end: end ? new Date(end).toISOString() : undefined,
    period,
  };
  return await axios
    .post(WOS_GET_WORKS_IN_DATE_RANGE_ENDPOINT, formData)
    .then((res) => res.data as GetWorksInDateRangeOutput);
};

export const getWorkStatisticInDateRange = async (
  clientId: string,
  workflowId: string,
  start?: string,
  end?: string,
  period?: string
): Promise<GetWorkStatisticInDateRangeOutput> => {
  const formData = {
    clientId,
    workflowId,
    start: start ? new Date(start).toISOString() : undefined,
    end: end ? new Date(end).toISOString() : undefined,
    period,
  };
  return await axios
    .post(WOS_GET_WORK_STATISTIC_IN_DATE_RANGE_ENDPOINT, formData)
    .then((res) => res.data as GetWorkStatisticInDateRangeOutput);
};

export const queryWorks = async (
  clientId: string,
  workflowId: string,
  clauses: any[]
) => {
  const formData = {
    clientId,
    workflowId,
    clauses,
  };
  return await axios
    .post(WOS_QUERY_WORKS_ENDPOINT, formData)
    .then((res) => res.data as QueryWorksOutput)
    .catch((_) => undefined);
};
