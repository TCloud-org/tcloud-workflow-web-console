import { AppWorkflowCollapse } from "DataDisplayComponents/AppWorkflowCollapse";
import { CodeBeam } from "DataDisplayComponents/CodeBeam";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { Route } from "../../Config/WorkflowConfig";
import { AppCollapseLabel } from "../../DataDisplayComponents/AppCollapseLabel";
import { AppEmpty } from "../../DataDisplayComponents/AppEmpty";
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
      {Object.entries(workRequestMap)
        .sort((a, b) => a[1].runningOrder - b[1].runningOrder)
        .filter((entry) => entry[1].workRequest)
        .map(([source, value], i) => (
          <AppWorkflowCollapse
            key={`req-${i}`}
            className="!mb-0"
            items={[
              {
                key: `child-${i}`,
                label: <AppCollapseLabel label={source} endTags={value.tags} />,
                children: (
                  <CodeBeam
                    hideToolbar
                    showLineNumbers={false}
                    nostyle
                    className="!bg-transparent !shadow-none mt-2"
                    value="json"
                    borderColor="transparent"
                    snippets={[
                      {
                        key: "json",
                        label: "JSON",
                        language: "json",
                        value: JSON.stringify(value.workRequest, null, 2),
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        ))}
      <Typography.Title level={5}>Document Entity</Typography.Title>
      {Object.entries(entities).map(([k, v], i) => (
        <AppWorkflowCollapse
          key={`entity-${i}`}
          className="!mb-0"
          items={[
            {
              key: `child-${i}`,
              label: <AppCollapseLabel label={k} />,
              children: (
                <CodeBeam
                  hideToolbar
                  showLineNumbers={false}
                  nostyle
                  className="!bg-transparent !shadow-none mt-2"
                  value="json"
                  borderColor="transparent"
                  snippets={[
                    {
                      key: "json",
                      label: "JSON",
                      language: "json",
                      value: JSON.stringify({ [k]: v }, null, 2),
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      ))}
    </AppSpace>
  );
};
