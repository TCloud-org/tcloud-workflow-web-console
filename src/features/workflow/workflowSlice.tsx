import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WorkflowState {
  workflow: any;
}

const initialState: WorkflowState = {
  workflow: null,
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
