import axios from "axios";
import {
  WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT,
  WOS_GET_CONFIGURATION_BY_ID_ENDPOINT,
  WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT,
  WOS_GET_SERVICE_CONFIGURATIONS_BY_CLIENT_ID_ENDPOINT,
} from "../Config/EndpointConfig";
import {
  GetConfigurationByIdOutput,
  GetConfigurationsByServiceNameOutput,
  GetGraphsByWorkflowIdOutput,
  GetServiceConfigurationsByClientIdOutput,
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
