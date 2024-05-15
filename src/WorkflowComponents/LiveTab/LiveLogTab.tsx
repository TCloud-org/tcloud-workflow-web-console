import { CodeBeam } from "DataDisplayComponents/CodeBeam";
import { Flex, Typography } from "antd";
import { Route } from "../../Config/WorkflowConfig";
import { AppCollapse } from "../../DataDisplayComponents/AppCollapse";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { AppTag } from "../../DataDisplayComponents/AppTag";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { extractNumOfChanges } from "../../Utils/ObjectUtils";
import { deserializeDocumentChangeLogs } from "../../Utils/Serializer";

export const LiveLogTab = (props: { routes?: Route[] }) => {
  const { routes = [] } = props;

  return (
    <Flex vertical gap={16}>
      {routes.map((route, i) => (
        <AppCollapse
          key={i}
          items={[
            {
              key: i,
              label: (
                <AppSpace direction="horizontal">
                  <Typography.Text>{route.source}</Typography.Text>

                  {extractNumOfChanges(route) && (
                    <AppTag color="processing">
                      {extractNumOfChanges(route)}
                    </AppTag>
                  )}
                </AppSpace>
              ),
              children: (
                <AppSurface backgroundColor="white" style={{ padding: 0 }}>
                  <CodeBeam
                    value="json"
                    snippets={[
                      {
                        key: "json",
                        label: "JSON",
                        language: "json",
                        value: JSON.stringify(
                          deserializeDocumentChangeLogs(route),
                          null,
                          2
                        ),
                      },
                    ]}
                  />
                </AppSurface>
              ),
            },
          ]}
        />
      ))}
    </Flex>
  );
};
