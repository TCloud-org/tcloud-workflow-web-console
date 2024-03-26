import { Tag, Typography } from "antd";
import { Route } from "../Config/WorkflowConfig";
import { AppCollapse } from "../DataDisplayComponents/AppCollapse";
import { CodeDisplay } from "../DataDisplayComponents/CodeDisplay";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { deserializeDocumentChangeLogs } from "../Utils/Serializer";
import { extractNumOfChanges } from "../Utils/ObjectUtils";

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
              <Tag color="processing">{extractNumOfChanges(route)}</Tag>
            )}
          </AppSpace>
        ),
        children: (
          <CodeDisplay
            code={JSON.stringify(deserializeDocumentChangeLogs(route), null, 2)}
          />
        ),
      }))}
    />
  );
};
