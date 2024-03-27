import { CheckSquareFilled, CopyOutlined } from "@ant-design/icons";
import { ButtonSize, ButtonType } from "antd/es/button";
import { CSSProperties, useRef, useState } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";

interface AppCopyProps {
  content: string;
  style?: CSSProperties;
  size?: ButtonSize;
  type?: ButtonType;
}

export const AppCopy = ({ content, style, size, type }: AppCopyProps) => {
  const [copied, setCopied] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopyToClipboard = (jsonString: string) => {
    clearTimeout(timeoutIdRef.current!);
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        setCopied(true);
        timeoutIdRef.current = setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) =>
        console.error("Error copying JSON to clipboard: ", error)
      );
  };

  return (
    <div style={{ ...style }}>
      <AppIconButton
        tooltip={copied ? "Copied" : "Copy to clipboard"}
        size={size}
        type={type}
        onClick={() => handleCopyToClipboard(content)}
      >
        {!copied ? <CopyOutlined /> : <CheckSquareFilled />}
      </AppIconButton>
    </div>
  );
};
