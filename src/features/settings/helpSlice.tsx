import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HelpState {
  tabIndex: string;
}

const initialState: HelpState = {
  tabIndex: "support",
};

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    setTabIndex: (state, action: PayloadAction<string>) => {
      state.tabIndex = action.payload;
    },
  },
});

export const { setTabIndex } = helpSlice.actions;

export default helpSlice.reducer;
