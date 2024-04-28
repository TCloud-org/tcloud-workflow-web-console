import { Client, ClientInvitee } from "Config/SCSConfig";
import {
  SCS_GET_CLIENTS_URL,
  SCS_GET_CLIENT_INVITEES_BY_CLIENT_ID,
  SCS_GET_INVITATION_TOKENS_BY_SENDER_URL,
  SCS_GET_INVITATION_TOKEN_URL,
} from "Config/SCSEndpointConfig";
import axios from "axios";

export interface GetClientsResponse {
  clients: Client[];
}

export interface GetClientInviteesByClientIdResponse {
  clientInvitees: ClientInvitee[];
}

export enum PermissionType {
  READ = "READ",
  WRITE = "WRITE",
  DELETE = "DELETE",
  ADMIN = "ADMIN",
}

export enum InvitationStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
  SENT = "SENT",
}

export interface InvitationToken {
  invitationTokenId: number;
  sender: string;
  receiver: string;
  token: string;
  location: string;
  grantedPermissions: PermissionType[];
  status: InvitationStatus;
  sentAt: string;
  expiredAt: string;
  confirmedAt: string;
}

export interface GetInvitationTokenResponse {
  invitationToken: InvitationToken;
}

export interface GetInvitationTokensBySenderResponse {
  invitationTokens: InvitationToken[];
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

export const getInvitationToken = async (token: string) => {
  return await axios
    .get(`${SCS_GET_INVITATION_TOKEN_URL}?token=${token}`)
    .then((res) => res.data as GetInvitationTokenResponse);
};

export const getInvitationTokensBySenderAndLocation = async (
  email: string,
  clientId: string
) => {
  const params = new URLSearchParams();
  params.set("sender", email);
  params.set("location", clientId);
  return await axios
    .get(`${SCS_GET_INVITATION_TOKENS_BY_SENDER_URL}?${params}`)
    .then((res) => res.data as GetInvitationTokensBySenderResponse);
};
