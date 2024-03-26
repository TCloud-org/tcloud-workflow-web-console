import axios from "axios";
import { WOS_GET_CONFIGURATIONS_BY_SERVICE_NAME_ENDPOINT } from "../Config/EndpointConfig";
import { ServiceConfiguration } from "../Config/WorkflowConfig";

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
