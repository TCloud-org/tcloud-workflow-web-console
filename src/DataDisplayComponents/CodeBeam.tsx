import { CodeSegmented } from "DataEntryComponents/CodeSegmented";
import { Flex, theme } from "antd";
import { CSSProperties, useState } from "react";
import { useSelector } from "react-redux";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { AppCopy } from "./AppCopy";

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
  wrapLongLines?: boolean;
  themeMode?: "light" | "dark";
  showLineNumbers?: boolean;
  nostyle?: boolean;
}) => {
  const { token } = theme.useToken();

  const themeMapping = {
    light: {
      backgroundColor: "#ffffff",
      borderColor: token.colorBorder,
      textColor: token.colorText,
      codeTheme: atomOneLight,
    },
    dark: {
      backgroundColor: "#0a1021",
      borderColor: "#222c3f",
      textColor: textColor,
      codeTheme: atomOneDark,
    },
  };

  const {
    value = "",
    showDots,
    label,
    snippets = [],
    onChange = () => {},
    borderColor,
    hideToolbar,
    className = "",
    style,
    wrapLongLines = false,
    showLineNumbers = true,
    nostyle,
  } = props;

  const isDarkMode = useSelector((state: any) => state.general.isDarkMode);

  const currentTheme = themeMapping[isDarkMode ? "dark" : "light"];

  const [select, setSelect] = useState<string>(value);

  const code = snippets.find((snippet) => snippet.key === select)?.value;

  return (
    <div
      className={`rounded-xl flex flex-col overflow-hidden relative ${
        nostyle ? "" : "glass-bar"
      } ${className}`}
      style={{
        ...style,
      }}
    >
      {!hideToolbar && (
        <div
          className="flex items-center justify-between p-4"
          style={{
            borderBottom: `1px solid ${
              borderColor || currentTheme.borderColor
            }`,
          }}
        >
          <Flex align="center" gap={16}>
            {showDots && (
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            )}

            {label && (
              <div style={{ color: currentTheme.textColor }}>{label}</div>
            )}

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

          <AppCopy content={code} color={currentTheme.textColor} />
        </div>
      )}

      <ReactSyntaxHighlighter
        language={snippets.find((snippet) => snippet.key === select)?.language}
        style={currentTheme.codeTheme}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrapLongLines}
        customStyle={{
          padding: borderColor === "transparent" ? 0 : "27px",
          fontSize: "0.75rem",
          background: "transparent",
          border: "none",
          color: currentTheme.textColor,
          maxHeight: 700,
          overflow: "auto",
        }}
      >
        {`${code}`}
      </ReactSyntaxHighlighter>
      {hideToolbar && (
        <AppCopy
          content={code}
          color={currentTheme.textColor}
          className="absolute top-2 right-2"
        />
      )}
    </div>
  );
};
