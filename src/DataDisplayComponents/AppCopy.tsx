import {
  ContentCopyRounded,
  LibraryAddCheckRounded,
} from "@mui/icons-material";
import { Tooltip } from "antd";
import { CSSProperties, useState } from "react";

export const AppCopy = (props: {
  content?: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) => {
  const { content = "", className, style, color } = props;

  const [copy, setCopy] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  if (copy) {
    return (
      <div style={{ lineHeight: 0, ...style }} className={className}>
        <Tooltip title="Copied">
          <LibraryAddCheckRounded style={{ fontSize: 16, color: color }} />
        </Tooltip>
      </div>
    );
  }

  return (
    <div style={{ lineHeight: 0, ...style }} className={className}>
      <Tooltip title="Copy">
        <ContentCopyRounded
          style={{ cursor: "pointer", fontSize: 16, color: color }}
          onClick={handleCopy}
        />
      </Tooltip>
    </div>
  );
};
