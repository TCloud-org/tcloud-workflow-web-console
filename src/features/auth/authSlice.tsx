import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Account {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailVerified?: boolean;
}

export interface AuthState {
  token?: string;
  account?: Account;
}

const initialState: AuthState = {
  token: undefined,
  account: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.account = action.payload.account;
    },
    logout: (state) => {
      state.token = undefined;
      state.account = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
