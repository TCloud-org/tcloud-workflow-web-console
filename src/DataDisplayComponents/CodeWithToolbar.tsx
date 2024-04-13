import { AppCodeToolbar } from "DataEntryComponents/AppCodeToolbar";
import { Flex, theme } from "antd";
import { CodeDisplay } from "./CodeDisplay";

export const CodeWithToolbar = (props: { code?: string }) => {
  const { token } = theme.useToken();
  const { code } = props;
  return (
    <Flex vertical gap="8px">
      <AppCodeToolbar />
      <CodeDisplay
        code={code}
        backgroundColor={token.colorFillQuaternary}
        showLineNumbers
      />
    </Flex>
  );
};
