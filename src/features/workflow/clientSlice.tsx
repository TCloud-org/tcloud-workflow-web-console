import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Client } from "Config/SCSConfig";

export interface ClientState {
  clientId: string | null | undefined;
  clients: Client[];
}

const initialState: ClientState = {
  clientId: null,
  clients: [],
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    updateClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload;
    },
    setClientId: (state, action: PayloadAction<string | null | undefined>) => {
      state.clientId = action.payload;
    },
  },
});

export const { setClientId, updateClients } = clientSlice.actions;

export default clientSlice.reducer;
