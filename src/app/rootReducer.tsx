import { combineReducers } from "@reduxjs/toolkit";
import breadcrumbReducer from "../features/navigation/breadcrumbSlice";
import persistedReducer from "./reduxPersistConfig";
import clientReducer from "../features/workflow/clientSlice";
import workflowReducer from "../features/workflow/workflowSlice";
import siderReducer from "../features/navigation/siderSlice";
import generalReducer from "features/settings/generalSlice";
import workFilterReducer from "features/filter/workFilterSlice";
import historyReducer from "features/search/historySlice";
import authReducer from "features/auth/authSlice";
import menuFavoriteReducer from "features/favorite/menuFavoriteSlice";
import storage from "redux-persist/lib/storage";
import dashboardReducer from "features/settings/dashboardSlice";
import stepWorkflowReducer from "features/settings/stepWorkflowSlice";
import settingsReducer from "features/settings/settingsSlice";

export const ActionType = {
  logout: "LOG_OUT",
};

const appReducer = combineReducers({
  breadcrumb: breadcrumbReducer,
  client: clientReducer,
  workflow: workflowReducer,
  sider: siderReducer,
  general: generalReducer,
  workFilter: workFilterReducer,
  history: historyReducer,
  auth: authReducer,
  menuFavorite: menuFavoriteReducer,
  dashboard: dashboardReducer,
  stepWorkflow: stepWorkflowReducer,
  settings: settingsReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOG_OUT") {
    storage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistedReducer(rootReducer);
