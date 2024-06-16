import { Span } from "Config/DataDisplayInterface";
import { Graph, Route } from "Config/WorkflowConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { AppInfo } from "DataDisplayComponents/AppInfo";
import { formatDate, formatTime } from "Utils/DateUtils";
import { DescriptionsProps, Typography } from "antd";
import { useParams } from "react-router-dom";

export const WorkflowInfo = (props: { graph?: Graph; routes?: Route[] }) => {
  const { workId = "" } = useParams();

  const { graph, routes = [] } = props;

  const lastRoute = routes.length > 0 ? routes[routes.length - 1] : undefined;
  const firstRoute = routes.length > 0 ? routes[0] : undefined;
  const processingTime =
    lastRoute && firstRoute
      ? new Date(parseInt(lastRoute.createdAt) * 1000).getTime() -
        new Date(parseInt(firstRoute.createdAt) * 1000).getTime()
      : undefined;
  const defaultNextRetry = new Date(Date.now() + 15 * 60000).getTime();

  const items: DescriptionsProps["items"] = [
    {
      key: "workId",
      label: "Work ID".toUpperCase(),
      children: (
        <Typography.Text className="flex gap-1 items-center">
          {workId} <AppCopy content={workId} />
        </Typography.Text>
      ),
      span: Span[2],
    },
    {
      key: "graphId",
      label: "Graph ID".toUpperCase(),
      children: (
        <Typography.Text className="flex gap-1 items-center">
          {graph?.graphId} <AppCopy content={graph?.graphId.toString() || ""} />
        </Typography.Text>
      ),
      span: Span[2],
    },
    {
      key: "transitions",
      label: "Transitions".toUpperCase(),
      children: <p>{routes.length}</p>,
      span: Span[2],
    },
    {
      key: "nextRetryIn",
      label: "Next retry at".toUpperCase(),
      children: <p>{formatDate(lastRoute?.nextRetryAt || defaultNextRetry)}</p>,
      span: Span[2],
    },
    {
      key: "state",
      label: "State".toUpperCase(),
      children: <p>{lastRoute?.source ? lastRoute.source : "-"}</p>,
      span: Span[2],
    },
    {
      key: "status",
      label: "Status".toUpperCase(),
      children: <p>{lastRoute?.resultType ? lastRoute.resultType : "-"}</p>,
      span: Span[2],
    },
    {
      key: "processingTime",
      label: "Processing time".toUpperCase(),
      children: (
        <p>{processingTime ? formatTime(processingTime / 60000) : "-"}</p>
      ),
      span: Span[2],
    },
  ];

  return <AppInfo title="Information" items={items} />;
};
