import { SyncOutlined } from "@ant-design/icons";
import { dotStyle } from "DataDisplayComponents/AppSurface";
import { AppWorkflowCollapse } from "DataDisplayComponents/AppWorkflowCollapse";
import { Steps, theme } from "antd";
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

  const color: { [key: string]: CollapseTag } = {
    success: {
      color: token.colorSuccess,
    },
    failure: {
      color: token.colorError,
    },
    notified: {
      color: token.colorInfo,
    },
    default: {
      color: token.colorInfo,
    },
    terminal: {
      color: token.colorSuccess,
    },
    pending: {
      color: token.colorWarning,
    },
  };

  return (
    <Steps
      style={dotStyle}
      direction="vertical"
      className="pt-20 pb-16"
      size="small"
      current={-1}
      items={routes.map((route: Route, i: number) => ({
        icon: (
          <div style={{ color: color[route.resultType].color }}>
            {TagVariantMapping[route.resultType]?.icon}
          </div>
        ),
        description: (
          <AppWorkflowCollapse
            className={`${i === routes.length - 1 ? "mb-0" : ""}`}
            items={[
              {
                key: i,
                id: getId(route),
                label: (
                  <Fragment>
                    <AppCollapseLabel
                      time={route.createdAt}
                      label={route.source}
                      endTags={[
                        {
                          children: i + 1,
                          tooltip: `Transition ${i + 1}`,
                        },
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
                  </Fragment>
                ),
                children: <StateCardInfo data={route} />,
              },
            ]}
          />
        ),
      }))}
    />
  );
};
