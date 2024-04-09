import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GeneralState {
  isDevMode: boolean;
}

const initialState: GeneralState = {
  isDevMode: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setIsDevMode: (state, action: PayloadAction<boolean>) => {
      state.isDevMode = action.payload;
    },
  },
});

export const { setIsDevMode } = generalSlice.actions;

export default generalSlice.reducer;
