import { autocompletion } from "@codemirror/autocomplete";
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import ReactCodeMirror from "@uiw/react-codemirror";
import { Icon } from "SlateRichTextEditorComponents/RichTextToolbarComponents";
import { Divider, Flex, Segmented, Tooltip, Typography, theme } from "antd";
import { useState } from "react";

export const AppHtmlEditor = (props: {
  value?: string | null;
  onChange?: (e: any) => void;
  disabled?: boolean;
}) => {
  const { token } = theme.useToken();

  const { value = "", onChange = () => {} } = props;

  const [panorama, setPanorama] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const codeTheme = "light";

  return (
    <div
      style={{
        border: "1px solid",
        borderColor: token.colorBorder,
        borderRadius: token.borderRadiusSM,
        transition: "all 0.3s",
      }}
    >
      <Flex
        style={{ padding: "8px 16px" }}
        align="center"
        justify="space-between"
      >
        <Segmented
          value={panorama}
          onChange={setPanorama}
          options={[
            {
              value: "horizontal",
              label: (
                <Tooltip title="Horizontal view">
                  <Icon>panorama_horizontal</Icon>
                </Tooltip>
              ),
            },
            {
              value: "vertical",
              label: (
                <Tooltip title="Vertical view">
                  <Icon>panorama_vertical</Icon>
                </Tooltip>
              ),
            },
          ]}
        />
        <Typography.Text>HTML</Typography.Text>
      </Flex>
      <Divider
        style={{ margin: 0, backgroundColor: token.colorBorderSecondary }}
      />
      <Flex align="center" justify="center" vertical={panorama === "vertical"}>
        <ReactCodeMirror
          readOnly={props.disabled}
          value={value || ""}
          onChange={(value) => onChange(value)}
          theme={
            codeTheme === "light"
              ? githubLightInit({
                  settings: {
                    caret: "#000000",
                    fontFamily: "monospace",
                  },
                })
              : githubDarkInit({
                  settings: {
                    caret: "#c6c6c6",
                    fontFamily: "monospace",
                  },
                })
          }
          height="50vh"
          style={{
            overflow: "auto",
            width: "100%",
            flex: 1,
            borderRight: "1px solid",
            borderRightColor: token.colorBorder,
            borderBottom: "1px solid",
            borderBottomColor: token.colorBorder,
            borderRightWidth: panorama === "horizontal" ? "1px" : 0,
            borderBottomWidth: panorama === "horizontal" ? 0 : "1px",
          }}
          extensions={[langs.html(), autocompletion({ override: [] })]}
          onErrorCapture={(event) => console.log(event)}
        />
        <Flex
          style={{
            flex: 1,
            overflow: "auto",
            height: "50vh",
            width: "100%",
          }}
          justify="center"
          align="center"
          vertical
        >
          <div
            dangerouslySetInnerHTML={{ __html: value as string }}
            style={{ height: "100%", width: "100%", minHeight: "48vh" }}
          />
        </Flex>
      </Flex>
    </div>
  );
};
