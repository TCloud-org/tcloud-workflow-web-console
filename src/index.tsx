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
import { ConfigProvider } from "antd";

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
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#4312e5",
        // colorPrimary: "rgb(88 86 214 / 1)",
        boxShadow: "0 30px 60px 0 rgba(90, 116, 148, 0.15)",
        boxShadowSecondary: "0 30px 60px 0 rgba(90, 116, 148, 0.1)",
        colorBorder: "rgba(90, 116, 148, 0.15)",
        colorBorderSecondary: "rgba(90, 116, 148, 0.1)",
        colorFill: "rgb(203 213 225 / 0.6)",
        colorFillSecondary: "rgb(226 232 240 / 0.6)",
        colorFillTertiary: "rgb(241 245 249 / 0.6)",
        colorFillQuaternary: "rgb(248 250 252 / 0.6)",
        colorSuccess: "rgb(40 205 65 / 1)",
        colorError: "rgb(255 59 48 / 1)",
        colorInfo: "rgb(0 122 255 / 1)",
        colorWarning: "rgb(255 204 0 / 1)",
        colorText: "rgb(30 41 59 / 1)",
        colorTextBase: "rgb(30 41 59 / 1)",
      },
    }}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
        >
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </ConfigProvider>
);

reportWebVitals();
