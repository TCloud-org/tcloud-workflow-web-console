import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider, ThemeConfig } from "antd";
import {
  CustomEditor,
  CustomElement,
  CustomText,
  EmptyText,
} from "custom-types";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BaseRange } from "slate";
import { App } from "./App";
import { persistor, store } from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ReactNode } from "react";

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

const darkTheme: ThemeConfig = {
  components: {
    Tree: {
      directoryNodeSelectedBg: "transparent",
      directoryNodeSelectedColor: "white",
      controlItemBgHover: "transparent",
    },
    List: {
      colorTextLabel: "white",
    },
    Button: {
      defaultShadow: "none",
      textHoverBg: "rgb(148 163 184 / 0.1)",
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 8,
      dangerShadow:
        "rgba(2, 3, 28, 0.8) 0px 4px 10px 4px, rgba(206, 206, 251, 0.16) 0px 0px 0px 4px, rgba(234, 234, 251, 0.3) 0px -4px 12px 0px inset",
      primaryShadow:
        "rgba(2, 3, 28, 0.8) 0px 4px 10px 4px, rgba(206, 206, 251, 0.16) 0px 0px 0px 4px, rgba(234, 234, 251, 0.3) 0px -4px 12px 0px inset",
    },
    Input: {
      colorBgContainer: "rgb(22 20 39 / 0.5)",
      hoverBorderColor: "rgb(40 38 55 / 1)",
      activeBorderColor: "rgb(141 140 149 / 1)",
      colorText: "white",
      colorTextPlaceholder: "rgb(141 140 149 / 1)",
      colorBorder: "rgb(40 38 55 / 1)",
      activeShadow: "none",
      colorTextDisabled: "#8d8c95",
    },
    InputNumber: {
      colorBgContainer: "rgb(22 20 39 / 0.5)",
      hoverBorderColor: "rgb(40 38 55 / 1)",
      activeBorderColor: "rgb(141 140 149 / 1)",
      colorText: "white",
      colorTextPlaceholder: "rgb(141 140 149 / 1)",
      colorBorder: "rgb(40 38 55 / 1)",
      activeShadow: "none",
      colorTextDisabled: "#8d8c95",
    },
    Select: {
      optionSelectedColor: "white",
      optionSelectedBg: "rgb(70 69 83 / 0.5)",
      optionActiveBg: "rgb(70 69 83 / 0.5)",
      colorText: "white",
      colorBgContainer: "rgb(22 20 39 / 0.5)",
      colorPrimaryHover: "rgb(40 38 55 / 1)",
      colorBorder: "rgb(40 38 55 / 1)",
      colorPrimary: "rgb(141 140 149 / 1)",
      controlOutlineWidth: 0,
      colorTextDisabled: "#8d8c95",
    },
    DatePicker: {
      colorBgContainer: "rgb(22 20 39 / 0.5)",
      hoverBg: "blue",
      activeBorderColor: "rgb(141 140 149 / 1)",
      cellHoverWithRangeBg: "rgb(148 163 184 / 0.15)",
      cellActiveWithRangeBg: "rgb(148 163 184 / 0.15)",
    },
    Table: {
      rowHoverBg: "rgb(148 163 184 / 0.1)",
      rowSelectedBg: "rgb(148 163 184 / 0.1)",
      rowSelectedHoverBg: "rgb(148 163 184 / 0.1)",
      headerSortHoverBg: "rgb(148 163 184 / 0.2)",
      headerSortActiveBg: "rgb(148 163 184 / 0.2)",
      bodySortBg: "rgb(148 163 184 / 0.1)",
      headerColor: "white",
      headerBg: "#161427",
      colorBgContainer: "transparent",
    },
    Tooltip: {
      colorBgSpotlight: "#161427",
    },
    Alert: {
      colorInfoBg: "#02031C",
    },
    Segmented: {
      itemActiveBg: "#602AF8",
      itemHoverBg: "rgb(148 163 184 / 0.1)",
      itemSelectedBg: "#602AF8",
      trackBg: "rgb(148 163 184 / 0.1)",
    },
    Modal: {
      headerBg: "transparent",
    },
  },
  token: {
    colorBgBase: "#02031d",
    colorBgContainer: "#02031d",
    colorPrimary: "#602AF8",

    boxShadow: "rgba(164, 143, 255, 0.12) 0px -7px 120px 0px inset",
    boxShadowSecondary: "rgba(164, 143, 255, 0.12) 0px -7px 120px 0px inset",

    colorBorder: "#282637",
    colorBorderSecondary: "#201f30",

    colorFill: "rgb(148 163 184 / 0.2)",
    colorFillSecondary: "rgb(148 163 184 / 0.15)",
    colorFillTertiary: "rgb(148 163 184 / 0.1)",
    colorFillQuaternary: "rgb(148 163 184 / 0.075)",

    colorSuccess: "rgb(40 205 65 / 1)",
    colorError: "rgb(255 59 48 / 1)",
    colorInfo: "rgb(0 122 255 / 1)",
    colorWarning: "rgb(255 204 0 / 1)",

    colorText: "#ffffff",
    colorTextBase: "#ffffff",
    colorTextDisabled: "#8d8c95",
  },
};

const lightTheme: ThemeConfig = {
  components: {
    Tree: {
      directoryNodeSelectedBg: "transparent",
      directoryNodeSelectedColor: "black",
      controlItemBgHover: "transparent",
    },
    List: {
      colorTextLabel: "black",
    },
    Button: {
      defaultShadow: "none",
      textHoverBg: "rgb(148 163 184 / 0.1)",
      borderRadius: 6,
      borderRadiusSM: 4,
      borderRadiusLG: 8,
      dangerShadow:
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      primaryShadow:
        "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    },
    Input: {
      colorBgContainer: "white",
      hoverBorderColor: "#d8dee4",
      activeBorderColor: "rgb(141 140 149 / 1)",
      colorText: "black",
      colorTextPlaceholder: "rgb(141 140 149 / 1)",
      colorBorder: "#d8dee4",
      activeShadow: "none",
      colorTextDisabled: "#8d8c95",
    },
    InputNumber: {
      colorBgContainer: "white",
      hoverBorderColor: "#d8dee4",
      activeBorderColor: "rgb(141 140 149 / 1)",
      colorText: "black",
      colorTextPlaceholder: "rgb(141 140 149 / 1)",
      colorBorder: "#d8dee4",
      activeShadow: "none",
      colorTextDisabled: "#8d8c95",
    },
    Select: {
      optionSelectedBg: "rgb(148 163 184 / 0.1)",
      optionActiveBg: "rgb(148 163 184 / 0.1)",
      colorText: "black",
      colorBgContainer: "white",
      colorBorder: "#d8dee4",
      colorPrimary: "rgb(141 140 149 / 1)",
      controlOutlineWidth: 0,
      colorTextDisabled: "#8d8c95",
    },
    DatePicker: {
      colorBgContainer: "white",
      hoverBg: "blue",
      activeBorderColor: "rgb(141 140 149 / 1)",
      cellHoverWithRangeBg: "rgb(148 163 184 / 0.15)",
      cellActiveWithRangeBg: "rgb(148 163 184 / 0.15)",
    },
    Table: {
      rowHoverBg: "rgb(148 163 184 / 0.1)",
      rowSelectedBg: "rgb(148 163 184 / 0.1)",
      rowSelectedHoverBg: "rgb(148 163 184 / 0.1)",
      headerSortHoverBg: "rgb(148 163 184 / 0.2)",
      headerSortActiveBg: "rgb(148 163 184 / 0.2)",
      bodySortBg: "rgb(148 163 184 / 0.1)",
      headerColor: "black",
      headerBg: "#161427",
      colorBgContainer: "transparent",
    },
    Tooltip: {
      colorBgSpotlight: "#161427",
    },
    Alert: {
      colorInfoBg: "#02031C",
    },
    Modal: {
      headerBg: "transparent",
    },
  },
  token: {
    colorBgBase: "white",
    colorBgContainer: "white",
    colorPrimary: "#602AF8",

    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    boxShadowSecondary: "rgba(0, 0, 0, 0.16) 0px 1px 4px",

    colorBorder: "#d8dee4",
    colorBorderSecondary: "#d8dee4",

    colorFill: "rgb(148 163 184 / 0.2)",
    colorFillSecondary: "rgb(148 163 184 / 0.15)",
    colorFillTertiary: "rgb(148 163 184 / 0.1)",
    colorFillQuaternary: "rgb(148 163 184 / 0.075)",

    colorSuccess: "rgb(40 205 65 / 1)",
    colorError: "rgb(255 59 48 / 1)",
    colorInfo: "rgb(0 122 255 / 1)",
    colorWarning: "rgb(255 204 0 / 1)",

    colorText: "#000000",
    colorTextBase: "#000000",
    colorTextDisabled: "#8d8c95",
  },
};

const Wrapper = (props: { children: ReactNode }) => {
  const isDarkMode = useSelector((state: any) => state.general.isDarkMode);

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {props.children}
    </ConfigProvider>
  );
};

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string}
      >
        <Wrapper>
          <App />
        </Wrapper>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);

reportWebVitals();
