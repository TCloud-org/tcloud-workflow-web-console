import { autocompletion } from "@codemirror/autocomplete";
import { langs } from "@uiw/codemirror-extensions-langs";
import { githubDarkInit, githubLightInit } from "@uiw/codemirror-theme-github";
import ReactCodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { CSSProperties } from "react";

export const XMLCodeEditor = (props: {
  theme?: "light" | "dark";
  value?: string | undefined;
  onChange?: (value: string, viewUpdate: ViewUpdate) => void;
  style?: CSSProperties;
}) => {
  const {
    theme = "light",
    value = '<?xml version="1.0" encoding="UTF-8"?>',
    onChange = () => {},
    style,
  } = props;

  const myCompletions = (context: any) => {
    let word = context.matchBefore(/\w*/);
    if (word.from === word.to && !context.explicit) return null;
    return {
      from: word.from,
      options: [
        {
          label: "workflow",
          type: "text",
          apply: 'workflow initialState=""></workflow>',
        },
        {
          label: "state",
          type: "text",
          apply: 'state name="" service="" operation=""></state>',
        },
        {
          label: "wait",
          type: "text",
          apply: 'wait name="" duration="" unit=""></wait>',
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
        { label: "terminal", type: "text", apply: "terminal" },
        { label: "name", type: "text", apply: 'name=""' },
        { label: "goto", type: "text", apply: 'goto=""' },
        { label: "initialState", type: "text", apply: 'initialState=""' },
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
        theme === "light"
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
      extensions={[langs.xml(), autocompletion({ override: [myCompletions] })]}
      onErrorCapture={(event) => console.log(event)}
    />
  );
};
