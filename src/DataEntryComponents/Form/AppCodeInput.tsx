import { ContentCopyRounded } from "@mui/icons-material";
import LibraryAddCheckRounded from "@mui/icons-material/LibraryAddCheckRounded";
import { Span } from "Config/DataDisplayInterface";
import { XMLCodeEditor } from "DataDisplayComponents/XMLCodeEditor";
import { AppSegmented } from "DataEntryComponents/AppSegmented";
import { GraphBuilder } from "WorkflowComponents/GraphBuilder";
import { Flex, Form, Segmented, Tooltip, theme } from "antd";
import { ReactNode, useMemo, useState } from "react";

export enum GraphFormatType {
  XML_GRAPH_FORMAT = "xmlGraphFormat",
  UI_BUILDER_GRAPH_FORMAT = "uiBuilderGraphFormat",
}
export const AppCodeInput = (props: {
  value?: any;
  onChange?: (e: any) => void;
  endDecorator?: ReactNode;
  banner?: ReactNode;
  showOptions?: boolean;
}) => {
  const { token } = theme.useToken();
  const { showOptions, value } = props;

  const [copy, setCopy] = useState<boolean>(false);
  const inputType = useMemo(
    () => value?.type || GraphFormatType.XML_GRAPH_FORMAT,
    [value]
  );

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

      {showOptions && (
        <Flex>
          <Form.Item name={["graphFormat", "type"]} noStyle>
            <Segmented
              options={[
                { label: "XML", value: GraphFormatType.XML_GRAPH_FORMAT },
                {
                  label: "Graph Builder",
                  value: GraphFormatType.UI_BUILDER_GRAPH_FORMAT,
                },
              ]}
              property="value"
            />
          </Form.Item>
        </Flex>
      )}

      {inputType === GraphFormatType.UI_BUILDER_GRAPH_FORMAT ? (
        <Form.Item
          name={["graphFormat", inputType, "states"]}
          wrapperCol={Span[1]}
        >
          <GraphBuilder />
        </Form.Item>
      ) : (
        <div
          className="bg-[#fff] rounded-xl overflow-hidden"
          style={{ border: `1px solid ${token.colorBorder}` }}
        >
          <div
            className="flex items-center justify-between p-4"
            style={{ borderBottom: `1px solid ${token.colorBorder}` }}
          >
            <Flex align="center" gap={16}>
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
              <div style={{ color: token.colorText }}>{props.endDecorator}</div>

              {copy ? (
                <Tooltip title="Copied">
                  <LibraryAddCheckRounded
                    style={{ color: token.colorText, fontSize: 18 }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Copy">
                  <ContentCopyRounded
                    style={{
                      color: token.colorText,
                      cursor: "pointer",
                      fontSize: 18,
                    }}
                    onClick={handleCopy}
                  />
                </Tooltip>
              )}
            </Flex>
          </div>
          <Form.Item
            name={["graphFormat", inputType, "xml"]}
            className="w-full"
            wrapperCol={Span[1]}
            noStyle
          >
            <XMLCodeEditor theme="light" style={{ width: "100%" }} />
          </Form.Item>
        </div>
      )}
    </Flex>
  );
};
