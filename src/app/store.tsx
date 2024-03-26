import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { middleware } from "./middleware";
import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export const persistor = persistStore(store);
