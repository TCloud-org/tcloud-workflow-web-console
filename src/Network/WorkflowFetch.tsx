import axios from "axios";
import {
  WOS_GET_BILLING_ENDPOINT,
  WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT,
  WOS_GET_CONFIGURATION_BY_ID_ENDPOINT,
  WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT,
  WOS_GET_GRAPH_BY_ID_ENDPOINT,
  WOS_GET_INFRA_STAT_ENDPOINT,
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
  InfraStatistic,
  StepWorkflowBilling,
} from "../Config/WorkflowConfig";

export const fetchServiceConfiguration = async (
  clientId: string,
  service: string,
  token: string
): Promise<GetConfigurationsByServiceNameOutput> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios
    .get(
      `${WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT}?clientId=${clientId}&serviceName=${service}`,
      config
    )
    .then((response) => {
      return response.data as GetConfigurationsByServiceNameOutput;
    });
};

export const fetchGraphsById = async (
  workflowId: string | number | undefined,
  token: string
) => {
  if (!workflowId) return undefined;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(
      `${WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT}?workflowId=${workflowId}`,
      config
    )
    .then((response) => {
      return response.data as GetGraphsByWorkflowIdOutput;
    })
    .catch((_) => {
      return undefined;
    });
};

export const getServiceConfigurations = async (
  clientId: string | undefined,
  token: string
) => {
  if (!clientId) return undefined;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(
      `${WOS_GET_SERVICE_CONFIGURATIONS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`,
      config
    )
    .then((response) => {
      return response.data as GetServiceConfigurationsByClientIdOutput;
    })
    .catch((_) => undefined);
};

export const getConfigurationsByService = async (
  clientId: string,
  service: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(
      `${WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT}?clientId=${clientId}&serviceName=${service}`,
      config
    )
    .then((response) => {
      return response.data as GetConfigurationsByServiceNameOutput;
    })
    .catch((_) => undefined);
};

export const getConfigurationById = async (
  serviceId: string | number | undefined,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(
      `${WOS_GET_CONFIGURATION_BY_ID_ENDPOINT}?serviceId=${serviceId}`,
      config
    )
    .then((response) => {
      return response.data as GetConfigurationByIdOutput;
    })
    .catch((_) => undefined);
};

export const getBuckets = async (workflowId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const params = new URLSearchParams();
  params.set("workflowId", workflowId);
  return await axios
    .get(
      `${WOS_GET_WORKFLOW_BUCKETS_BY_CLIENT_ID_AND_WORKFLOW_ID_ENDPOINT}?${params}`,
      config
    )
    .then((response) => {
      return response.data as GetWorkflowBucketsByClientIdAndWorkflowIdOutput;
    })
    .catch((err) => err);
};

export const getWorkflowConfiguration = async (
  workId: string,
  version: string,
  token: string
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const params = new URLSearchParams();
  params.set("workId", workId);
  params.set("version", version);
  return await axios
    .get(`${WOS_GET_WORKFLOW_CONFIGURATION_ENDPOINT}?${params}`, config)
    .then((response) => response.data as GetWorkflowConfigurationOutput)
    .catch((_) => undefined);
};

export const getServicesFromGraph = async (xml: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const formData = {
    xml,
  };
  return await axios
    .post(WOS_GET_SERVICES_FROM_GRAPH_ENDPOINT, formData, config)
    .then((response) => response.data as GetServicesFromGraphOutput)
    .catch((_) => undefined);
};

export const getGraphById = async (graphId: string | number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(`${WOS_GET_GRAPH_BY_ID_ENDPOINT}?graphId=${graphId}`, config)
    .then((response) => response.data as GetGraphByIdOutput);
};

export interface GetInfraStatOutput {
  infraStatistic: InfraStatistic;
}

export const getInfraStat = async (clientId: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(`${WOS_GET_INFRA_STAT_ENDPOINT}?clientId=${clientId}`, config)
    .then((res) => res.data as GetInfraStatOutput);
};

export interface GetBillingOutput {
  billing: StepWorkflowBilling;
}

export const getBilling = async (email: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios
    .get(`${WOS_GET_BILLING_ENDPOINT}?email=${email}`, config)
    .then((res) => res.data as GetBillingOutput);
};
