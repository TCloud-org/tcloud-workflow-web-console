import { PersistConfig, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LRUCacheTransform from "transforms/LruCacheTransform";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  transforms: [LRUCacheTransform],
};

const persistedReducer = (reducer: any) =>
  persistReducer(persistConfig, reducer);

export default persistedReducer;
