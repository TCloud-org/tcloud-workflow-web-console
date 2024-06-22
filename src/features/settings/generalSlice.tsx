import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeneralState {
  isDevMode: boolean;
  isDarkMode: boolean;
}

const initialState: GeneralState = {
  isDevMode: false,
  isDarkMode: true,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setIsDevMode: (state, action: PayloadAction<boolean>) => {
      state.isDevMode = action.payload;
    },
  },
});

export const { setIsDevMode, setIsDarkMode } = generalSlice.actions;

export default generalSlice.reducer;
