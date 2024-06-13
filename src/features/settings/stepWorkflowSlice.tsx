import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StepWorkflowState {
  tabIndex: string;
  configurationTabIndex: string;
  bucketWorkflowId: string | undefined;
}

const initialState: StepWorkflowState = {
  tabIndex: "work",
  configurationTabIndex: "workflow",
  bucketWorkflowId: undefined,
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
    setBucketWorkflowId: (state, action: PayloadAction<string>) => {
      state.bucketWorkflowId = action.payload;
    },
  },
});

export const { setTabIndex, setConfigurationTabIndex, setBucketWorkflowId } =
  stepWorkflowSlice.actions;

export default stepWorkflowSlice.reducer;
