import { SyncOutlined } from "@ant-design/icons";
import { AppWorkflowCollapse } from "DataDisplayComponents/AppWorkflowCollapse";
import { AppLineConnector } from "LayoutComponents/AppLineConnector";
import { theme } from "antd";
import { Fragment } from "react/jsx-runtime";
import { SelectItem } from "../../Config/DataDisplayInterface";
import { Route } from "../../Config/WorkflowConfig";
import { AppCollapseLabel } from "../../DataDisplayComponents/AppCollapseLabel";
import { TagVariantMapping } from "../../DataDisplayComponents/AppTag";
import { CollapseTag } from "../../Utils/ObjectUtils";
import { StateCardInfo } from "../StateCardInfo";

export const LiveWorkflowViewTab = (props: {
  routeMap: { [key: string]: Route[] };
  versions: SelectItem[];
  version: string;
}) => {
  const { token } = theme.useToken();
  const { routeMap, version } = props;

  const routes: Route[] = (routeMap && version && routeMap[version]) || [];

  const getId = (route: Route) => {
    return `${route.version}-${route.workId}-${route.runningOrder}`;
  };

  const getColor = (route: Route) => {
    if (route.resultType === "failure") {
      return token.colorError;
    }
    return token.colorPrimary;
  };

  return (
    <AppWorkflowCollapse
      items={routes.map((route: Route, i: number) => ({
        key: i,
        id: getId(route),
        label: (
          <Fragment>
            <AppCollapseLabel
              step={i + 1}
              label={route.source}
              startTags={[
                {
                  children:
                    route.resultType === "terminal"
                      ? "success"
                      : route.resultType,
                  color: TagVariantMapping[route.resultType]?.color,
                  icon: TagVariantMapping[route.resultType]?.icon,
                  tooltip: "Result type",
                },
              ]}
              endTags={[
                ...(i > 0 && routes[i - 1].source === route.source
                  ? [
                      {
                        children: `Attempt #${
                          i -
                          routes.findIndex(
                            (item) => route.source === item.source
                          )
                        }`,
                        icon: <SyncOutlined />,
                      } as CollapseTag,
                    ]
                  : []),
                ...(route?.metadata?.httpResponse
                  ? [
                      ...(route?.metadata?.httpResponse.latency
                        ? [
                            {
                              children: `${route?.metadata?.httpResponse.latency} ms`,
                              tooltip: `Latency: ${route?.metadata?.httpResponse.latency} ms`,
                            } as CollapseTag,
                          ]
                        : []),
                      {
                        children: `${route?.metadata?.httpResponse.statusCode} ${route?.metadata?.httpResponse.status}`,
                        tooltip: `Reason: ${route?.metadata?.httpResponse.reasonPhrase}`,
                      } as CollapseTag,
                    ]
                  : []),
                {
                  children: route.resultName,
                  tooltip: "Result name",
                },
              ]}
            />

            {i > 0 && (
              <AppLineConnector
                start={getId(routes[i - 1])}
                end={getId(route)}
                headShape="arrow1"
                color={getColor(route)}
              />
            )}
          </Fragment>
        ),
        children: <StateCardInfo data={route} />,
      }))}
    />
  );
};
