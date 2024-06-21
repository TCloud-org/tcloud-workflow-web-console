import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

export interface DashboardState {
  period: string;
  dateRange: [start: Dayjs | undefined, end: Dayjs | undefined];
  onboardingCurrentProcess: number;
}

const initialState: DashboardState = {
  period: "TODAY",
  dateRange: [undefined, undefined],
  onboardingCurrentProcess: 0,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setOnboardingCurrentProcess: (state, action: PayloadAction<number>) => {
      state.onboardingCurrentProcess = action.payload;
    },
    setPeriod: (state, action: PayloadAction<string>) => {
      state.period = action.payload;
    },
    setDateRange: (
      state,
      action: PayloadAction<[start: Dayjs | undefined, end: Dayjs | undefined]>
    ) => {
      state.dateRange = action.payload;
    },
  },
});

export const { setPeriod, setDateRange, setOnboardingCurrentProcess } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
