import { Span } from "Config/DataDisplayInterface";
import { Graph } from "Config/WorkflowConfig";
import { AppCopy } from "DataDisplayComponents/AppCopy";
import { AppDescriptions } from "DataDisplayComponents/AppDescriptions";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { Typography } from "antd";
import { useParams } from "react-router-dom";

export const WorkflowInfo = (props: { graph?: Graph }) => {
  const { workId = "" } = useParams();

  const { graph } = props;

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
        ]}
        layout="vertical"
      />
    </AppSurface>
  );
};
