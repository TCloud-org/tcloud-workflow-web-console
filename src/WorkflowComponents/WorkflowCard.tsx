import { Workflow } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { formatDateString } from "Utils/DateUtils";
import { Flex, Typography } from "antd";

const data = [
  {
    value: "workflowId",
    label: "ID",
  },
  {
    value: "workflowName",
    label: "Name",
  },
  {
    value: "clientId",
    label: "Client",
  },
  {
    value: "createdAt",
    label: "Created",
    format: (text: string) => formatDateString(text),
  },
  {
    value: "nextAvailableVersion",
    label: "Next version",
  },
];
export const WorkflowCard = (props: { workflow?: Workflow }) => {
  const { workflow } = props;

  if (!workflow) return null;

  return (
    <AppCard
      title={workflow.workflowName}
      style={{ height: "100%" }}
      styles={{
        actions: {
          flex: 1,
        },
      }}
    >
      <Flex vertical gap={8}>
        {data.map((item, i) => (
          <Flex key={i} align="flex-end" justify="space-between">
            <Typography.Text strong style={{ fontSize: 12, flex: 1 }}>
              {item.label}
            </Typography.Text>
            <Typography.Text
              style={{ fontSize: 12, flex: 2, textAlign: "end" }}
            >
              {item.format
                ? item.format(workflow[item.value as keyof Workflow] as string)
                : (workflow[item.value as keyof Workflow] as string)}
            </Typography.Text>
          </Flex>
        ))}
      </Flex>
    </AppCard>
  );
};
