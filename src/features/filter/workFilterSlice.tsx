import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Clause } from "Config/FilterConfig";
import { v4 } from "uuid";

export interface FilterQuery {
  key: string;
  clauses: Clause[];
}

export interface WorkFilterState {
  saved: FilterQuery[];
  active?: string;
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
      const newClause: FilterQuery = {
        key: v4().split("-")[0],
        clauses: action.payload,
      };
      state.saved = [...state.saved, newClause];
    },
    update: (
      state,
      action: PayloadAction<{ clauses: Clause[]; key?: string }>
    ) => {
      const { clauses, key } = action.payload;
      if (!key) return;
      const index = state.saved.findIndex((item) => item.key === key);
      if (index >= 0 && index < state.saved.length) {
        const saved = [...state.saved];
        saved[index] = { ...saved[index], clauses };
        state.saved = [...saved];
      }
    },
    activate: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      if (state.active === key) {
        state.active = undefined;
      } else {
        state.active = key;
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      const saved = [...state.saved];
      saved.splice(
        saved.findIndex((item) => item.key === action.payload),
        1
      );
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
