import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum AuthType {
  "GOOGLE" = "GOOGLE",
  "EMAIL" = "EMAIL",
}

export enum ProductType {
  STEP_WORKFLOW = "StepWorkflow",
  EMAIL_NOTIFICATION_WORKFLOW = "EmailNotificationWorkflow",
}

export enum ProductTierType {
  FREE_TIER = "FreeTier",
  STARTUP = "Startup",
  SCALEUP = "Scaleup",
  ENTERPRISE = "Enterprise",
}

export interface ProductTier {
  product: ProductType;
  tier: ProductTierType;
}

export interface Account {
  email: string;
  firstName?: string;
  lastName?: string;
  authType?: AuthType;
  isEmailVerified?: boolean;
  phoneNumber?: string;
  countryCode?: string;
  profileImageUrl?: string;
  createdAt?: string;
  productTiers?: ProductTier[];
}

export interface EmailAuth {
  email: string;
  password: string;
}

export interface AuthState {
  token?: string;
  account?: Account;
  rememberMeToken?: string;
}

const initialState: AuthState = {
  token: undefined,
  account: undefined,
  rememberMeToken: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.account = action.payload.account;
      state.rememberMeToken = action.payload.rememberMeToken;
    },
    logout: (state) => {
      state.token = undefined;
      state.account = undefined;
    },
    setAccount: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
    },
  },
});

export const { login, logout, setAccount } = authSlice.actions;

export default authSlice.reducer;
