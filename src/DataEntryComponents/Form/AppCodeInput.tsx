import { borderColor, textColor } from "Config/LayoutConfig";
import { XMLCodeEditor } from "DataDisplayComponents/XMLCodeEditor";
import { AppSegmented } from "DataEntryComponents/AppSegmented";
import { Flex, Tooltip } from "antd";
import LibraryAddCheckRounded from "@mui/icons-material/LibraryAddCheckRounded";
import { ContentCopyRounded } from "@mui/icons-material";
import { ReactNode, useState } from "react";

export const AppCodeInput = (props: {
  value?: string;
  onChange?: (e: string) => void;
  endDecorator?: ReactNode;
  banner?: ReactNode;
}) => {
  const [copy, setCopy] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.value || "");
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
  };

  return (
    <Flex vertical gap={16}>
      {props.banner}
      <div
        className="bg-[#0a1021] rounded-xl overflow-hidden"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <Flex align="center" gap={16}>
            {/* <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div> */}

            <AppSegmented
              value="xml"
              options={[
                {
                  label: "XML",
                  value: "xml",
                },
              ]}
            />
          </Flex>

          <Flex align="center" gap={16}>
            <div style={{ color: textColor }}>{props.endDecorator}</div>

            {copy ? (
              <Tooltip title="Copied">
                <LibraryAddCheckRounded
                  style={{ color: textColor, fontSize: 18 }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Copy">
                <ContentCopyRounded
                  style={{ color: textColor, cursor: "pointer", fontSize: 18 }}
                  onClick={handleCopy}
                />
              </Tooltip>
            )}
          </Flex>
        </div>
        <XMLCodeEditor
          theme="dark"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </Flex>
  );
};
