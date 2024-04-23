import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuFavoriteState {
  pinned: { [key: string]: boolean };
}

const initialState: MenuFavoriteState = {
  pinned: {},
};

export const menuFavoriteSlice = createSlice({
  name: "menuFavorite",
  initialState,
  reducers: {
    setPinned: (state, action: PayloadAction<{ [key: string]: boolean }>) => {
      state.pinned = { ...state.pinned, ...action.payload };
    },
  },
});

export const { setPinned } = menuFavoriteSlice.actions;

export default menuFavoriteSlice.reducer;
