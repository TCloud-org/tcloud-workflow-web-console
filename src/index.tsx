import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  CustomEditor,
  CustomElement,
  CustomText,
  EmptyText,
} from "custom-types";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BaseRange } from "slate";
import { App } from "./App";
import { persistor, store } from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
      >
        <App />
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
