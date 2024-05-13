import { Workflow } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppButton } from "DataEntryComponents/AppButton";
import { formatDateString } from "Utils/DateUtils";
import { Flex, Typography } from "antd";
import { setWorkflow } from "features/workflow/workflowSlice";
import { useDispatch, useSelector } from "react-redux";

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
    label: "Next available version",
  },
];
export const WorkflowCard = (props: { workflow?: Workflow }) => {
  const dispatch = useDispatch();

  const activeWorkflow: Workflow | undefined = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const { workflow } = props;

  const isActive = activeWorkflow?.workflowId === workflow?.workflowId;

  const handleActivate = () => {
    if (!isActive) {
      dispatch(setWorkflow(workflow));
    } else {
      dispatch(setWorkflow(undefined));
    }
  };

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
      actions={[
        <AppButton
          type="text"
          style={{ width: "90%" }}
          onClick={handleActivate}
          danger={isActive}
        >
          {isActive ? "Deactivate" : "Activate"}
        </AppButton>,
      ]}
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
