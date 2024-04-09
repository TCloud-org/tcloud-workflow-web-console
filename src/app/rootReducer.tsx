import { combineReducers } from "@reduxjs/toolkit";
import breadcrumbReducer from "../features/navigation/breadcrumbSlice";
import persistedReducer from "./reduxPersistConfig";
import clientReducer from "../features/workflow/clientSlice";
import workflowReducer from "../features/workflow/workflowSlice";
import siderReducer from "../features/navigation/siderSlice";
import generalReducer from "features/settings/generalSlice";
import workFilterReducer from "features/filter/workFilterSlice";

const rootReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  client: clientReducer,
  workflow: workflowReducer,
  sider: siderReducer,
  general: generalReducer,
  workFilter: workFilterReducer,
});

export default persistedReducer(rootReducer);
