import { autocompletion } from "@codemirror/autocomplete";
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import ReactCodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { textColor } from "Config/LayoutConfig";
import { theme } from "antd";
import { CSSProperties } from "react";

export type CodeTheme = "light" | "dark" | undefined;
export const XMLCodeEditor = (props: {
  theme?: CodeTheme;
  value?: string | undefined;
  onChange?: (value: string, viewUpdate: ViewUpdate) => void;
  style?: CSSProperties;
}) => {
  const {
    theme: codeTheme = "light",
    value = '<?xml version="1.0" encoding="UTF-8"?>',
    onChange = () => {},
    style,
  } = props;
  const { token } = theme.useToken();

  const myCompletions = (context: any) => {
    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit) return null;
    return {
      from: word.from,
      options: [
        {
          label: "workflow",
          type: "text",
          apply: 'workflow name="" retryPolicyId=""></workflow>',
        },
        {
          label: "state",
          type: "text",
          apply: 'state name="" service="" operation=""></state>',
        },
        {
          label: "wait",
          type: "text",
          apply: 'wait name="" period=""></wait>',
        },
        { label: "success", type: "text", apply: 'success name="" goto=""/>' },
        {
          label: "notified",
          type: "text",
          apply: 'notified name="" goto=""/>',
        },
        { label: "failure", type: "text", apply: 'failure name="" goto=""/>' },
        { label: "pending", type: "text", apply: 'pending name="" goto=""/>' },
        { label: "default", type: "text", apply: 'default goto=""/>' },
        { label: "operation", type: "text", apply: 'operation=""' },
        { label: "name", type: "text", apply: 'name=""' },
        { label: "goto", type: "text", apply: 'goto=""' },
        { label: "retryPolicyId", type: "text", apply: 'retryPolicyId=""' },
      ],
    };
  };

  return (
    <ReactCodeMirror
      value={value}
      onChange={onChange}
      style={style}
      theme={
        codeTheme === "light"
          ? githubLightInit({
              settings: {
                caret: "#000000",
                fontFamily: "monospace",
                lineHighlight: token.colorFillTertiary,
              },
            })
          : githubDarkInit({
              settings: {
                background: "transparent",
                caret: textColor,
                gutterBackground: "#0a1021",
                fontFamily: "monospace",
              },
            })
      }
      extensions={[langs.xml(), autocompletion({ override: [myCompletions] })]}
      onErrorCapture={(event) => console.log(event)}
    />
  );
};
