import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StepWorkflowState {
  tabIndex: string;
  bucketWorkflowId: string | undefined;
  graphWorkflowId: string | undefined;
  queryWorkflowId: string | undefined;
}

const initialState: StepWorkflowState = {
  tabIndex: "work",
  bucketWorkflowId: undefined,
  graphWorkflowId: undefined,
  queryWorkflowId: undefined,
};

export const stepWorkflowSlice = createSlice({
  name: "stepWorkflow",
  initialState,
  reducers: {
    setTabIndex: (state, action: PayloadAction<string>) => {
      state.tabIndex = action.payload;
    },
    setBucketWorkflowId: (state, action: PayloadAction<string>) => {
      state.bucketWorkflowId = action.payload;
    },
    setGraphWorkflowId: (state, action: PayloadAction<string>) => {
      state.graphWorkflowId = action.payload;
    },
    setQueryWorkflowId: (state, action: PayloadAction<string>) => {
      state.queryWorkflowId = action.payload;
    },
  },
});

export const {
  setTabIndex,
  setBucketWorkflowId,
  setGraphWorkflowId,
  setQueryWorkflowId,
} = stepWorkflowSlice.actions;

export default stepWorkflowSlice.reducer;
