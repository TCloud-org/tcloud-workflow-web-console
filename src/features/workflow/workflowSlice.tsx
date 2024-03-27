import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WorkflowState {
  workflow: {
    workflowId?: number | string;
    workflowName?: string;
  };
}

const initialState: WorkflowState = {
  workflow: {},
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    setWorkflow: (state, action: PayloadAction<any>) => {
      state.workflow = action.payload;
    },
  },
});

export const { setWorkflow } = workflowSlice.actions;

export default workflowSlice.reducer;
