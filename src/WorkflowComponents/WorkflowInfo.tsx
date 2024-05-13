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
    <AppSurface type="form" style={{ paddingBottom: 0 }} className="h-full">
      <AppDescriptions
        title="Info"
        items={[
          {
            key: "workflowId",
            label: "Workflow Id",
            children: (
              <Typography.Text className="flex gap-1 items-center">
                {workId} <AppCopy content={workId} />
              </Typography.Text>
            ),
            span: Span[1],
          },
          {
            key: "graphId",
            label: "Graph Id",
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
