import { AppCopy } from "DataDisplayComponents/AppCopy";
import { CodeSnippet } from "Utils/CodeUtils";
import { formatCamelCaseKey } from "Utils/ObjectUtils";
import { Flex, Select, theme } from "antd";
import { CSSProperties, Dispatch, SetStateAction } from "react";

export const AppCodeToolbar = (props: {
  code?: string;
  snippets?: { [key: string]: CodeSnippet };
  setLanguage?: Dispatch<SetStateAction<string>>;
  language?: string;
}) => {
  const { token } = theme.useToken();

  const { snippets = {}, language = "", setLanguage = () => {} } = props;

  const style: CSSProperties = {
    padding: "8px",
    border: "1px solid",
    borderColor: token.colorBorder,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary,
  };

  return (
    <Flex align="center" style={style} gap="8px" justify="space-between">
      <div style={{ flex: 1 }} />
      <Flex align="center" gap="8px">
        <Select
          options={Object.entries(snippets).map(([k, v]) => ({
            label: formatCamelCaseKey(k),
            value: k,
          }))}
          style={{ width: "80px" }}
          onChange={(value) => setLanguage(value)}
          variant="filled"
          value={language.toUpperCase()}
        />
        <AppCopy content={snippets[language]?.snippet} />
      </Flex>
    </Flex>
  );
};
