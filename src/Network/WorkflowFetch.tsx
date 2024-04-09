import axios from "axios";
import {
  WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT,
  WOS_GET_CONFIGURATION_BY_ID_ENDPOINT,
  WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT,
  WOS_GET_GRAPH_BY_ID_ENDPOINT,
  WOS_GET_SERVICES_FROM_GRAPH_ENDPOINT,
  WOS_GET_SERVICE_CONFIGURATIONS_BY_CLIENT_ID_ENDPOINT,
  WOS_GET_WORKFLOW_BUCKETS_BY_CLIENT_ID_AND_WORKFLOW_ID_ENDPOINT,
  WOS_GET_WORKFLOW_CONFIGURATION_ENDPOINT,
} from "../Config/WOSEndpointConfig";
import {
  GetConfigurationByIdOutput,
  GetConfigurationsByServiceNameOutput,
  GetGraphByIdOutput,
  GetGraphsByWorkflowIdOutput,
  GetServiceConfigurationsByClientIdOutput,
  GetServicesFromGraphOutput,
  GetWorkflowBucketsByClientIdAndWorkflowIdOutput,
  GetWorkflowConfigurationOutput,
  ServiceConfiguration,
} from "../Config/WorkflowConfig";

export const fetchServiceConfiguration = (service: string) => {
  if (service) {
    return axios
      .get(
        `${WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT}?serviceName=${service}`
      )
      .then((response) => {
        return response.data.configurations as ServiceConfiguration[];
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
  return [];
};

export const fetchGraphsById = async (workflowId: string | undefined) => {
  if (!workflowId) return undefined;
  return await axios
    .get(`${WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT}?workflowId=${workflowId}`)
    .then((response) => {
      return response.data as GetGraphsByWorkflowIdOutput;
    })
    .catch((_) => {
      return undefined;
    });
};

export const getServiceConfigurations = async (
  clientId: string | undefined
) => {
  if (!clientId) return undefined;
  return await axios
    .get(
      `${WOS_GET_SERVICE_CONFIGURATIONS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`
    )
    .then((response) => {
      return response.data as GetServiceConfigurationsByClientIdOutput;
    })
    .catch((_) => undefined);
};

export const getConfigurationsByService = async (
  service: string | undefined
) => {
  return await axios
    .get(
      `${WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT}?serviceName=${service}`
    )
    .then((response) => {
      return response.data as GetConfigurationsByServiceNameOutput;
    })
    .catch((_) => undefined);
};

export const getConfigurationById = async (
  serviceId: string | number | undefined
) => {
  return await axios
    .get(`${WOS_GET_CONFIGURATION_BY_ID_ENDPOINT}?serviceId=${serviceId}`)
    .then((response) => {
      return response.data as GetConfigurationByIdOutput;
    })
    .catch((_) => undefined);
};

export const getBuckets = async (clientId: string, workflowId: string) => {
  const params = new URLSearchParams();
  params.set("clientId", clientId);
  params.set("workflowId", workflowId);
  return await axios
    .get(
      `${WOS_GET_WORKFLOW_BUCKETS_BY_CLIENT_ID_AND_WORKFLOW_ID_ENDPOINT}?${params}`
    )
    .then((response) => {
      return response.data as GetWorkflowBucketsByClientIdAndWorkflowIdOutput;
    })
    .catch((_) => undefined);
};

export const getWorkflowConfiguration = async (
  workId: string,
  version: string
) => {
  const params = new URLSearchParams();
  params.set("workId", workId);
  params.set("version", version);
  return await axios
    .get(`${WOS_GET_WORKFLOW_CONFIGURATION_ENDPOINT}?${params}`)
    .then((response) => response.data as GetWorkflowConfigurationOutput)
    .catch((_) => undefined);
};

export const getServicesFromGraph = async (xml: string) => {
  const formData = {
    xml,
  };
  return await axios
    .post(WOS_GET_SERVICES_FROM_GRAPH_ENDPOINT, formData)
    .then((response) => response.data as GetServicesFromGraphOutput)
    .catch((_) => undefined);
};

export const getGraphById = async (graphId: string | number) => {
  return await axios
    .get(`${WOS_GET_GRAPH_BY_ID_ENDPOINT}?graphId=${graphId}`)
    .then((response) => response.data as GetGraphByIdOutput);
};
