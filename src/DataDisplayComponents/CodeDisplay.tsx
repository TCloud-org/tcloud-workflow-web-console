import { theme } from "antd";
import { CSSProperties, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Box } from "../LayoutComponents/Box";
import { AppCopy } from "./AppCopy";

export const CodeDisplay = (props: {
  language?: "json" | "java" | "xml" | "javascript" | undefined;
  code?: string;
  backgroundColor?: string;
  style?: CSSProperties;
  showLineNumbers?: boolean | undefined;
  bordered?: boolean | undefined;
  copyToClipboard?: boolean | undefined;
  hovered?: boolean | undefined;
}) => {
  const { token } = theme.useToken();

  const borderStyle: CSSProperties = {
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: token.colorBorder,
    borderRadius: token.borderRadiusLG,
  };

  const hoverStyle: CSSProperties = {
    boxShadow: token.boxShadowTertiary,
    borderColor: token.colorInfoBorderHover,
    transition: "0.2s ease-in-out",
  };

  const {
    language = "json",
    code = "",
    backgroundColor,
    showLineNumbers,
    bordered,
    copyToClipboard,
    hovered,
  } = props;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Box
      style={{
        position: "relative",
        ...(bordered && borderStyle),
        ...(hovered && isHovered && hoverStyle),
      }}
      onMouseEnter={() => hovered && setIsHovered(true)}
      onMouseLeave={() => hovered && setIsHovered(false)}
    >
      <SyntaxHighlighter
        language={language}
        style={vs}
        wrapLongLines
        wrapLines
        showLineNumbers={showLineNumbers}
        customStyle={{
          fontSize: 12,
          backgroundColor: backgroundColor,
          width: "100%",
          ...props.style,
        }}
      >
        {code}
      </SyntaxHighlighter>

      {copyToClipboard && (
        <AppCopy
          content={code}
          style={{ position: "absolute", top: 0, right: 0, margin: "8px" }}
        />
      )}
    </Box>
  );
};

SyntaxHighlighter.registerLanguage("java", java);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("xml", xml);