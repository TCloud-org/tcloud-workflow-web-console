import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SiderState {
  selectedKeys: string[];
}

const initialState: SiderState = {
  selectedKeys: ["workflow"],
};

export const siderSlice = createSlice({
  name: "sider",
  initialState,
  reducers: {
    setSelectedKeys: (state, action: PayloadAction<string[]>) => {
      state.selectedKeys = [...action.payload];
    },
  },
});

export const { setSelectedKeys } = siderSlice.actions;

export default siderSlice.reducer;
