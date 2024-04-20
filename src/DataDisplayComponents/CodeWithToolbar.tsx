import { AppCodeToolbar } from "DataEntryComponents/AppCodeToolbar";
import { CodeSnippet } from "Utils/CodeUtils";
import { Flex } from "antd";
import { useState } from "react";
import { AppSurface } from "./AppSurface";
import { CodeDisplay } from "./CodeDisplay";

export const CodeWithToolbar = (props: {
  snippets?: { [key: string]: CodeSnippet };
}) => {
  const { snippets = {} } = props;

  const [language, setLanguage] = useState<string>(Object.keys(snippets)?.[0]);

  return (
    <Flex vertical gap="8px">
      <AppCodeToolbar
        snippets={snippets}
        setLanguage={setLanguage}
        language={language}
      />
      <AppSurface size="small">
        <CodeDisplay
          language={snippets[language]?.language}
          code={snippets[language]?.snippet}
          showLineNumbers
          wrapLongLines={false}
          style={{ borderWidth: "0px" }}
        />
      </AppSurface>
    </Flex>
  );
};
