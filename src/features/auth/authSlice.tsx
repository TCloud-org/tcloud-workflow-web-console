import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token?: string;
}

const initialState: AuthState = {
  token: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
