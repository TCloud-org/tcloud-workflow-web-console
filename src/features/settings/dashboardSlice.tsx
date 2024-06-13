import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

export interface DashboardState {
  period: string;
  dateRange: [start: Dayjs | undefined, end: Dayjs | undefined];
}

const initialState: DashboardState = {
  period: "TODAY",
  dateRange: [undefined, undefined],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
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

export const { setPeriod, setDateRange } = dashboardSlice.actions;

export default dashboardSlice.reducer;
