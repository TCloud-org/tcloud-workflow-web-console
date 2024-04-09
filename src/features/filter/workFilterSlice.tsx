import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clause } from "Config/FilterConfig";

export interface WorkFilterState {
  saved: Clause[][];
  active?: number;
}

const initialState: WorkFilterState = {
  saved: [],
  active: undefined,
};

export const workFilterSlice = createSlice({
  name: "workFilter",
  initialState,
  reducers: {
    save: (state, action: PayloadAction<Clause[]>) => {
      state.saved = [...state.saved, action.payload];
    },
    update: (
      state,
      action: PayloadAction<{ clauses: Clause[]; index: number }>
    ) => {
      const { clauses, index } = action.payload;
      if (index >= 0 && index < state.saved.length) {
        const saved = [...state.saved];
        saved[index] = [...clauses];
        state.saved = [...saved];
      }
    },
    activate: (state, action: PayloadAction<number>) => {
      const active = action.payload;
      if (active < state.saved.length) {
        if (active === state.active) {
          state.active = undefined;
        } else {
          state.active = active;
        }
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const saved = [...state.saved];
      saved.splice(action.payload, 1);
      state.saved = saved;
    },
    reset: (state) => {
      state.saved = initialState.saved;
    },
  },
});

export const { save, reset, remove, activate, update } =
  workFilterSlice.actions;

export default workFilterSlice.reducer;
