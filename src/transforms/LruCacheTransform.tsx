import {
  deserializeLRUCache,
  serializeLRUCache,
} from "features/search/historySlice";
import { createTransform } from "redux-persist";

const LRUCacheTransform = createTransform(
  (inboundState: any, key) => {
    const serializedCache = serializeLRUCache(inboundState.cache);
    return { ...inboundState, cache: serializedCache };
  },
  (outboundState: any, key) => {
    const deserializedCache = deserializeLRUCache(outboundState.cache);
    return { ...outboundState, cache: deserializedCache };
  },
  { whitelist: ["history"] }
);

export default LRUCacheTransform;
