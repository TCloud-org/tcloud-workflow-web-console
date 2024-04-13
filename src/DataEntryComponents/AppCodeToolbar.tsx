import { CodeLanguages } from "Config/DataEntryConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { Flex, Select, theme } from "antd";
import { CSSProperties } from "react";

export const AppCodeToolbar = (props: { code?: string }) => {
  const { token } = theme.useToken();

  const { code } = props;

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
          options={CodeLanguages}
          style={{ width: "80px" }}
          variant="filled"
          size="small"
          defaultValue="json"
        />
        <AppCopy type="text" size="small" content={code} />
      </Flex>
    </Flex>
  );
};
