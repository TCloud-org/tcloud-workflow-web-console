import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ClientState {
  clientId: string | null | undefined;
}

const initialState: ClientState = {
  clientId: null,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientId: (state, action: PayloadAction<string | null | undefined>) => {
      state.clientId = action.payload;
    },
  },
});

export const { setClientId } = clientSlice.actions;

export default clientSlice.reducer;
