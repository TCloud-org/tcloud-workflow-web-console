import { SelectProps } from "antd";
import { ChangeEvent } from "react";

export type InputEvent = ChangeEvent<HTMLInputElement & HTMLTextAreaElement>;

export const CodeLanguages: SelectProps["options"] = [
  { label: "JSON", value: "json" },
  { label: "Java", value: "java" },
  { label: "XML", value: "xml" },
  { label: "Node", value: "javascript" },
  { label: "Bash", value: "bash" },
];
