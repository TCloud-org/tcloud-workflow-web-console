import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StepWorkflowState {
  tabIndex: string;
  configurationTabIndex: string;
}

const initialState: StepWorkflowState = {
  tabIndex: "work",
  configurationTabIndex: "workflow",
};

export const stepWorkflowSlice = createSlice({
  name: "stepWorkflow",
  initialState,
  reducers: {
    setTabIndex: (state, action: PayloadAction<string>) => {
      state.tabIndex = action.payload;
    },
    setConfigurationTabIndex: (state, action: PayloadAction<string>) => {
      state.configurationTabIndex = action.payload;
    },
  },
});

export const { setTabIndex, setConfigurationTabIndex } =
  stepWorkflowSlice.actions;

export default stepWorkflowSlice.reducer;
