import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LRUCache } from "lru-cache";

const options = {
  max: 10,
};

export type LRUCacheType = LRUCache<string, string | number>;
export const serializeLRUCache = (
  cache: LRUCacheType | undefined
): { key: any; value: any }[] => {
  if (!cache) return [];
  const arr: { key: any; value: any }[] = [];
  cache.forEach((value, key) => {
    arr.push({ key, value });
  });
  return arr.reverse();
};

export const deserializeLRUCache = (
  entries: { key: any; value: any }[] | undefined
) => {
  const cache = new LRUCache<string, string | number>(options);
  if (entries) {
    entries.forEach((item) => {
      const { key, value } = item || {};
      cache.set(key, value);
    });
  }
  return cache;
};

export interface HistoryState {
  cache: LRUCacheType;
}

const initialState: HistoryState = {
  cache: new LRUCache(options),
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key, value } = action.payload;
      const cache = deserializeLRUCache(
        serializeLRUCache(state.cache as LRUCacheType)
      );
      cache.set(key, value);
      state.cache = cache;
    },
    remove: (state, action: PayloadAction<string>) => {
      const cache = deserializeLRUCache(
        serializeLRUCache(state.cache as LRUCacheType)
      );
      cache.delete(action.payload);
      state.cache = cache;
    },
    clear: (state) => {
      const cache = deserializeLRUCache(
        serializeLRUCache(state.cache as LRUCacheType)
      );
      cache.clear();
      state.cache = cache;
    },
  },
});

export const { set, clear, remove } = historySlice.actions;

export default historySlice.reducer;
