import { combineReducers } from "@reduxjs/toolkit";
import breadcrumbReducer from "../features/navigation/breadcrumbSlice";
import persistedReducer from "./reduxPersistConfig";
import clientReducer from "../features/workflow/clientSlice";
import workflowReducer from "../features/workflow/workflowSlice";

const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  client: clientReducer,
  workflow: workflowReducer,
});

export default persistedReducer(rootReducer);
