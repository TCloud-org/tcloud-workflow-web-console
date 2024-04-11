import { Typography } from "antd";
import { useEffect, useState } from "react";
import { Route } from "../../Config/WorkflowConfig";
import { AppCollapse } from "../../DataDisplayComponents/AppCollapse";
import { AppCollapseLabel } from "../../DataDisplayComponents/AppCollapseLabel";
import { AppEmpty } from "../../DataDisplayComponents/AppEmpty";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { CodeDisplay } from "../../DataDisplayComponents/CodeDisplay";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import {
  WorkRequestValue,
  extractEntities,
  extractWorkRequests,
} from "../../Utils/ObjectUtils";

export const LiveEntityTab = (props: { routes: Route[] }) => {
  const { routes = [] } = props;

  const [entities, setEntities] = useState<object>({});
  const [workRequestMap, setWorkRequestMap] = useState<{
    [source: string]: WorkRequestValue;
  }>({});

  useEffect(() => {
    setEntities(extractEntities(routes));
    setWorkRequestMap(extractWorkRequests(routes));
  }, [routes]);

  if (Object.entries(entities).length === 0) {
    return <AppEmpty />;
  }

  return (
    <AppSpace>
      <Typography.Title level={5}>Work Request</Typography.Title>
      <AppCollapse
        items={Object.entries(workRequestMap)
          .sort((a, b) => a[1].runningOrder - b[1].runningOrder)
          .filter((entry) => entry[1].workRequest)
          .map(([source, value], i) => ({
            key: i,
            label: <AppCollapseLabel label={source} endTags={value.tags} />,
            children: (
              <AppSurface backgroundColor="white" style={{ padding: 0 }}>
                <CodeDisplay
                  code={JSON.stringify(value.workRequest, null, 2)}
                  copyToClipboard
                  style={{ margin: "16px" }}
                />
              </AppSurface>
            ),
          }))}
      />
      <Typography.Title level={5}>Document Entity</Typography.Title>
      <AppCollapse
        items={Object.entries(entities).map(([k, v], i) => ({
          key: i,
          label: <AppCollapseLabel label={k} />,
          children: (
            <AppSurface backgroundColor="white" style={{ padding: 0 }}>
              <CodeDisplay
                code={JSON.stringify({ [k]: v }, null, 2)}
                copyToClipboard
                style={{ margin: "16px" }}
              />
            </AppSurface>
          ),
        }))}
      />
    </AppSpace>
  );
};