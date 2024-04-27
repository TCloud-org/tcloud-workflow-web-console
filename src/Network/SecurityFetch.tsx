import { Client, ClientInvitee } from "Config/SCSConfig";
import {
  SCS_GET_CLIENTS_URL,
  SCS_GET_CLIENT_INVITEES_BY_CLIENT_ID,
} from "Config/SCSEndpointConfig";
import axios from "axios";

export interface GetClientsResponse {
  clients: Client[];
}

export interface GetClientInviteesByClientIdResponse {
  clientInvitees: ClientInvitee[];
}

export const getClients = async (email: string) => {
  return await axios
    .get(`${SCS_GET_CLIENTS_URL}?email=${email}`)
    .then((res) => res.data as GetClientsResponse);
};

export const getClientInviteesByClientId = async (clientId: string) => {
  return await axios
    .get(`${SCS_GET_CLIENT_INVITEES_BY_CLIENT_ID}?clientId=${clientId}`)
    .then((res) => res.data as GetClientInviteesByClientIdResponse);
};
