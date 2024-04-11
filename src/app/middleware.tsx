import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import { thunk } from "redux-thunk";

export const middleware = (getDefaultMiddleware: GetDefaultMiddleware<any>) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk);
