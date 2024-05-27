import { Flex } from "antd";
import { Span } from "../Config/DataDisplayInterface";
import { Graph } from "../Config/WorkflowConfig";
import { AppDescriptions } from "../DataDisplayComponents/AppDescriptions";
import { AppEmpty } from "../DataDisplayComponents/AppEmpty";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { AppLink } from "../DataEntryComponents/AppLink";
import { formatDate } from "../Utils/DateUtils";

export const GraphInfoCard = (props: { graph?: Graph }) => {
  const { graph } = props;
  const columns = 3;

  if (!graph) {
    return (
      <AppSurface type="form">
        <Flex justify="center" align="center">
          <AppEmpty />
        </Flex>
      </AppSurface>
    );
  }
  return (
    <AppSurface type="form" style={{ paddingBottom: 0 }}>
      <AppDescriptions
        layout="vertical"
        items={[
          {
            label: "Graph ID",
            children: (
              <AppLink
                href={`/graph/${encodeURIComponent(graph.graphId)}`}
                tooltip="Click to view or edit graph"
              >
                {graph.graphId.toString()}
              </AppLink>
            ),
            span: Span[columns],
          },
          {
            label: "Version",
            children: graph.version,
            span: Span[columns],
          },
          {
            label: "Alias",
            children: graph.alias,
            span: Span[columns],
          },
          {
            label: "Description",
            children: graph.description,
            span: Span[columns],
          },
          {
            label: "Created",
            children: formatDate(graph.createdAt),
            span: Span[columns],
          },
          {
            label: "Updated",
            children: formatDate(graph.updatedAt) || "-",
            span: Span[columns],
          },
        ]}
      />
    </AppSurface>
  );
};
