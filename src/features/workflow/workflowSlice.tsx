import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Workflow } from "Config/WorkflowConfig";

export interface WorkflowState {
  workflow?: Workflow;
}

const initialState: WorkflowState = {
  workflow: undefined,
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    setWorkflow: (state, action: PayloadAction<Workflow | undefined>) => {
      state.workflow = action.payload;
    },
  },
});

export const { setWorkflow } = workflowSlice.actions;

export default workflowSlice.reducer;
