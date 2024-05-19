import { SyncOutlined } from "@ant-design/icons";
import { AppWorkflowCollapse } from "DataDisplayComponents/AppWorkflowCollapse";
import { SelectItem } from "../../Config/DataDisplayInterface";
import { Route } from "../../Config/WorkflowConfig";
import { AppCollapseLabel } from "../../DataDisplayComponents/AppCollapseLabel";
import { TagVariantMapping } from "../../DataDisplayComponents/AppTag";
import { CollapseTag } from "../../Utils/ObjectUtils";
import { StateCardInfo } from "../StateCardInfo";
import { getLatencyColor } from "WorkflowComponents/LatencyTag";

export const LiveWorkflowViewTab = (props: {
  routeMap: { [key: string]: Route[] };
  versions: SelectItem[];
  version: string;
}) => {
  const { routeMap, version } = props;

  const routes: Route[] = (routeMap && version && routeMap[version]) || [];

  return (
    <AppWorkflowCollapse
      items={routes.map((route: Route, i) => ({
        key: i,
        label: (
          <AppCollapseLabel
            label={route.source}
            endTags={[
              {
                children:
                  route.resultType === "terminal"
                    ? "success"
                    : route.resultType,
                color: TagVariantMapping[route.resultType]?.color,
                icon: TagVariantMapping[route.resultType]?.icon,
                tooltip: "Result",
              },
              ...(route?.metadata?.workflowRetryConfig?.retryIndex > 0
                ? [
                    {
                      children: `Attempt #${route?.metadata?.workflowRetryConfig?.retryIndex}`,
                      // color: "gold-inverse",
                      icon: <SyncOutlined />,
                    } as CollapseTag,
                  ]
                : []),
              ...(route?.metadata?.httpResponse
                ? [
                    {
                      children: `${route?.metadata?.httpResponse.latency} ms`,
                      color: getLatencyColor(
                        route?.metadata?.httpResponse.latency
                      ),
                      tooltip: `Latency: ${route?.metadata?.httpResponse.latency} ms`,
                    } as CollapseTag,
                    {
                      children: `${route?.metadata?.httpResponse.statusCode} ${route?.metadata?.httpResponse.status}`,
                      // color: getStatusCodeColor(
                      //   route?.metadata?.httpResponse.statusCode
                      // ),
                      tooltip: `Reason: ${route?.metadata?.httpResponse.reasonPhrase}`,
                    } as CollapseTag,
                  ]
                : []),
              {
                children: route.resultName,
                // color: TagVariantMapping[route.resultType]?.color,
                icon: TagVariantMapping[route.resultType]?.icon,
                tooltip: "Result name",
              },
            ]}
          />
        ),
        children: <StateCardInfo data={route} />,
      }))}
    />
  );
};
