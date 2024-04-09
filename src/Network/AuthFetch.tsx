import axios from "axios";
import {
  GetTokenByIdResponse,
  GetTokensByClientIdResponse,
} from "../Config/AuthConfig";
import {
  SCS_GET_TOKENS_BY_CLIENT_ID,
  SCS_GET_TOKEN_BY_ID_URL,
} from "../Config/SCSEndpointConfig";

export const getTokens = async (
  clientId: string
): Promise<GetTokensByClientIdResponse> => {
  return await axios
    .get(`${SCS_GET_TOKENS_BY_CLIENT_ID}?clientId=${clientId}`)
    .then((response) => response.data as GetTokensByClientIdResponse);
};

export const getTokenById = async (
  tokenId: string
): Promise<GetTokenByIdResponse> => {
  return await axios
    .get(`${SCS_GET_TOKEN_BY_ID_URL}?tokenId=${tokenId}`)
    .then((res) => res.data as GetTokenByIdResponse);
};
