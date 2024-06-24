import { AppCollapseLabel } from "DataDisplayComponents/AppCollapseLabel";
import { AppWorkflowCollapse } from "DataDisplayComponents/AppWorkflowCollapse";
import { CodeBeam } from "DataDisplayComponents/CodeBeam";
import { Flex } from "antd";
import { Route } from "../../Config/WorkflowConfig";
import { CollapseTag, extractNumOfChanges } from "../../Utils/ObjectUtils";
import { deserializeDocumentChangeLogs } from "../../Utils/Serializer";

export const LiveLogTab = (props: { routes?: Route[] }) => {
  const { routes = [] } = props;

  const getChanges = (route: Route): CollapseTag[] => {
    const changes = extractNumOfChanges(route);
    if (!changes) {
      return [];
    }
    return [
      {
        children: changes,
      },
    ];
  };

  return (
    <Flex vertical gap={16}>
      {routes.map((route, i) => (
        <AppWorkflowCollapse
          key={i}
          className="!mb-0"
          items={[
            {
              key: i,
              label: (
                <AppCollapseLabel
                  label={route.source}
                  startTags={getChanges(route)}
                />
              ),
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
                      value: JSON.stringify(
                        deserializeDocumentChangeLogs(route),
                        null,
                        2
                      ),
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      ))}
    </Flex>
  );
};
