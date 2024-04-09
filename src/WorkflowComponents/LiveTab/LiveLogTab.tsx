import { Typography } from "antd";
import { Route } from "../../Config/WorkflowConfig";
import { AppCollapse } from "../../DataDisplayComponents/AppCollapse";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { AppTag } from "../../DataDisplayComponents/AppTag";
import { CodeDisplay } from "../../DataDisplayComponents/CodeDisplay";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { extractNumOfChanges } from "../../Utils/ObjectUtils";
import { deserializeDocumentChangeLogs } from "../../Utils/Serializer";

export const LiveLogTab = (props: { routes?: Route[] }) => {
  const { routes = [] } = props;

  return (
    <AppCollapse
      items={routes.map((route, i) => ({
        key: i,
        label: (
          <AppSpace direction="horizontal">
            <Typography.Text>{route.source}</Typography.Text>

            {extractNumOfChanges(route) && (
              <AppTag color="processing">{extractNumOfChanges(route)}</AppTag>
            )}
          </AppSpace>
        ),
        children: (
          <AppSurface backgroundColor="white" style={{ padding: 0 }}>
            <CodeDisplay
              code={JSON.stringify(
                deserializeDocumentChangeLogs(route),
                null,
                2
              )}
              copyToClipboard
              style={{ margin: "16px" }}
            />
          </AppSurface>
        ),
      }))}
    />
  );
};
