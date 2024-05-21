import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  tabIndex: string;
}

const initialState: SettingsState = {
  tabIndex: "account",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTabIndex: (state, action: PayloadAction<string>) => {
      state.tabIndex = action.payload;
    },
  },
});

export const { setTabIndex } = settingsSlice.actions;

export default settingsSlice.reducer;
