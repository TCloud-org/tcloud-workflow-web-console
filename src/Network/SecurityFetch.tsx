import { Client } from "Config/SCSConfig";
import { SCS_GET_CLIENTS_URL } from "Config/SCSEndpointConfig";
import axios from "axios";

export interface GetClientsResponse {
  clients: Client[];
}

export const getClients = async (email: string) => {
  return await axios
    .get(`${SCS_GET_CLIENTS_URL}?email=${email}`)
    .then((res) => res.data as GetClientsResponse);
};
