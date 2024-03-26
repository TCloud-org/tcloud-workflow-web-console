import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BreadcrumbItem {
  title: string;
  href: string;
}

export interface BreadcrumbState {
  items: BreadcrumbItem[];
}

const initialState: BreadcrumbState = {
  items: [
    {
      title: "Home",
      href: "/",
    },
  ],
};

export const breadcrumbSlice = createSlice({
  name: "breadcrumb",
  initialState,
  reducers: {
    push: (state, action: PayloadAction<BreadcrumbItem>) => {
      state.items = [...state.items, action.payload];
    },
    pop: (state) => {
      state.items = state.items.slice(0, -1);
    },
    reset: (state) => {
      state.items = initialState.items;
    },
    setItems: (state, action: PayloadAction<BreadcrumbItem[]>) => {
      state.items = [...initialState.items, ...action.payload];
    },
  },
});

export const { push, pop, reset, setItems } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
