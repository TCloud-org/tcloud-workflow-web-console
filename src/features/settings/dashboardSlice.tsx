import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  period: string;
}

const initialState: DashboardState = {
  period: "TODAY",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPeriod: (state, action: PayloadAction<string>) => {
      state.period = action.payload;
    },
  },
});

export const { setPeriod } = dashboardSlice.actions;

export default dashboardSlice.reducer;
