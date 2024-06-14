import { Span } from "Config/DataDisplayInterface";
import { Graph, Route } from "Config/WorkflowConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { AppDescriptions } from "DataDisplayComponents/AppDescriptions";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { formatDate } from "Utils/DateUtils";
import { Typography } from "antd";
import { useParams } from "react-router-dom";

export const WorkflowInfo = (props: { graph?: Graph; routes?: Route[] }) => {
  const { workId = "" } = useParams();

  const { graph, routes = [] } = props;

  const lastRoute = routes.length > 0 ? routes[routes.length - 1] : undefined;
  const defaultNextRetry = new Date(Date.now() + 5 * 60000).getTime();

  return (
    <AppSurface style={{ paddingBottom: 0 }}>
      <AppDescriptions
        title="Info"
        className="bg-transparent"
        items={[
          {
            key: "workId",
            label: "Work ID".toUpperCase(),
            children: (
              <Typography.Text className="flex gap-1 items-center">
                {workId} <AppCopy content={workId} />
              </Typography.Text>
            ),
            span: Span[1],
          },
          {
            key: "graphId",
            label: "Graph ID".toUpperCase(),
            children: (
              <Typography.Text className="flex gap-1 items-center">
                {graph?.graphId}{" "}
                <AppCopy content={graph?.graphId.toString() || ""} />
              </Typography.Text>
            ),
            span: Span[1],
          },
          {
            key: "transitions",
            label: "Transitions".toUpperCase(),
            children: <p>{routes.length}</p>,
            span: Span[2],
          },
          {
            key: "nextRetryIn",
            label: "Next retry in".toUpperCase(),
            children: (
              <p>{formatDate(lastRoute?.nextRetryAt || defaultNextRetry)}</p>
            ),
            span: Span[2],
          },
        ]}
        layout="vertical"
      />
    </AppSurface>
  );
};
