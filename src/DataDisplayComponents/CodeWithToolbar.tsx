import { AppCodeToolbar } from "DataEntryComponents/AppCodeToolbar";
import { CodeSnippet } from "Utils/CodeUtils";
import { Flex, theme } from "antd";
import { useState } from "react";
import { CodeDisplay } from "./CodeDisplay";

export const CodeWithToolbar = (props: {
  snippets?: { [key: string]: CodeSnippet };
}) => {
  const { token } = theme.useToken();
  const { snippets = {} } = props;

  const [language, setLanguage] = useState<string>(Object.keys(snippets)?.[0]);

  return (
    <Flex vertical gap="8px">
      <AppCodeToolbar
        snippets={snippets}
        setLanguage={setLanguage}
        language={language}
      />
      <CodeDisplay
        language={snippets[language]?.language}
        code={snippets[language]?.snippet}
        backgroundColor={token.colorFillQuaternary}
        showLineNumbers
        wrapLongLines={false}
      />
    </Flex>
  );
};
