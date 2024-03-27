import axios from "axios";
import {
  WOS_GET_RETRY_POLICIES_BY_CLIENT_ID_ENDPOINT,
  WOS_GET_RETRY_POLICY_BY_ID_ENDPOINT,
} from "../Config/EndpointConfig";
import {
  GetRetryPoliciesByClientIdOutput,
  GetRetryPolicyByIdOutput,
} from "../Config/RetryConfig";

export const getRetryPolicies = async (clientId: string) => {
  return await axios
    .get(`${WOS_GET_RETRY_POLICIES_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`)
    .then((response) => {
      return response.data as GetRetryPoliciesByClientIdOutput;
    })
    .catch((_) => undefined);
};

export const getRetryPolicy = async (
  retryPolicyId: string | number
): Promise<GetRetryPolicyByIdOutput | undefined> => {
  return await axios
    .get(
      `${WOS_GET_RETRY_POLICY_BY_ID_ENDPOINT}?retryPolicyId=${retryPolicyId}`
    )
    .then((response) => response.data as GetRetryPolicyByIdOutput)
    .catch((_) => undefined);
};
