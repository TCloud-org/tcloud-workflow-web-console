import { Flex } from "antd";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AppCopy } from "./AppCopy";
import { CSSProperties, useState } from "react";
import { CodeSegmented } from "DataEntryComponents/CodeSegmented";

export const textColor = "#f8fafc";

export type Language =
  | "java"
  | "javascript"
  | "python"
  | "xml"
  | "gradle"
  | "groovy"
  | "bash"
  | "json";

export interface Snippet {
  key: string;
  label: string;
  value: string;
  language: Language;
}

export const CodeBeam = (props: {
  snippets?: Snippet[];
  value?: string;
  showDots?: boolean;
  label?: string;
  onChange?: (value: string) => void;
  borderColor?: string;
  hideToolbar?: boolean;
  className?: string;
  style?: CSSProperties;
}) => {
  const {
    value = "",
    showDots,
    label,
    snippets = [],
    onChange = () => {},
    borderColor = "#222c3f",
    hideToolbar,
    className = "",
    style,
  } = props;

  const [select, setSelect] = useState<string>(value);

  const code = snippets.find((snippet) => snippet.key === select)?.value;

  return (
    <div
      className={`bg-[#0a1021] rounded-xl overflow-hidden ${className}`}
      style={{ border: `1px solid ${borderColor}`, ...style }}
    >
      {!hideToolbar && (
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <Flex align="center" gap={16}>
            {showDots && (
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            )}

            {label && <div style={{ color: textColor }}>{label}</div>}

            <CodeSegmented
              value={select}
              options={snippets.map((snippet) => ({
                label: snippet.label,
                value: snippet.key,
              }))}
              onChange={(e) => {
                setSelect(e);
                onChange(e);
              }}
            />
          </Flex>

          <AppCopy content={code} color={textColor} />
        </div>
      )}

      <ReactSyntaxHighlighter
        language={snippets.find((snippet) => snippet.key === select)?.language}
        style={atomOneDark}
        showLineNumbers={borderColor !== "transparent"}
        customStyle={{
          padding: borderColor === "transparent" ? 0 : "27px",
          fontSize: "0.75rem",
          backgroundColor: "#0a1021",
          border: "none",
          color: textColor,
        }}
      >
        {`${code}`}
      </ReactSyntaxHighlighter>
      {hideToolbar && (
        <AppCopy
          content={code}
          color={textColor}
          className="absolute top-2 right-2"
        />
      )}
    </div>
  );
};
