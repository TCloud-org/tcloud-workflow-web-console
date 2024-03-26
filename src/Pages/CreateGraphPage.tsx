import { useState } from "react";
import { XMLCodeEditor } from "../DataDisplayComponents/XMLCodeEditor";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { Button } from "antd";

export const CreateGraphPage = () => {
  const [xmlContent, setXMLContent] = useState<string>();

  const handleCodeChange = (value: string) => {
    setXMLContent(value);
  };

  return (
    <AppSpace>
      <AppSurface>
        <AppSpace>
          <Button>Test</Button>
        </AppSpace>
        <XMLCodeEditor onChange={handleCodeChange} style={{ width: "100%" }} />
      </AppSurface>
    </AppSpace>
  );
};
