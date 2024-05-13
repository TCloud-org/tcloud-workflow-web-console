import { Flex } from "antd";
import { AppCopy } from "./AppCopy";
import { AppSurface } from "./AppSurface";
import { CodeDisplay } from "./CodeDisplay";
import HttpMethodBadge, { HttpMethodBadgeProps } from "./HttpMethodBadge";

export const AppEndpointDoc = (props: {
  endpoint?: string;
  method?: HttpMethodBadgeProps["method"];
}) => {
  const { endpoint, method = "POST" } = props;
  return (
    <AppSurface size="small">
      <Flex justify="space-between" align="center">
        <Flex gap="12px" align="center">
          <HttpMethodBadge method={method} />
          <CodeDisplay
            language="bash"
            code={endpoint}
            style={{
              paddingRight: "16px",
            }}
          />
        </Flex>
        <AppCopy content={endpoint} />
      </Flex>
    </AppSurface>
  );
};
