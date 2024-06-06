import { PlusCircleOutlined } from "@ant-design/icons";
import {
  AddStepMenu,
  AutomationStep,
  borderColor,
  stepLineHeight,
} from "Config/AutomationConfig";
import { EventWorkflow, EventWorkflowStatus } from "Config/EventWorkflowConfig";
import { AppIconHolder } from "DataDisplayComponents/AppIconHolder";
import { AppSortableCard } from "DataEntryComponents/AppSortableCard";
import { Divider, Dropdown, Flex, Typography, theme } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { Dispatch, Key, SetStateAction, useEffect, useState } from "react";

export const EmailNotificationStep = (props: {
  data: AutomationStep;
  onAdd?: (item: Key | undefined) => void;
  isDragStart?: boolean;
  last?: boolean;
  collect: Dispatch<SetStateAction<any>>;
  formData: any;
  index: number;
  showAdd?: boolean;
  status?: EventWorkflowStatus;
  disabled?: boolean;
  eventWorkflow?: EventWorkflow;
}) => {
  const { token } = theme.useToken();
  const StatusColor: { [key: string]: string } = {
    [EventWorkflowStatus.SUCCESSFUL]: borderColor,
    [EventWorkflowStatus.PENDING]: token.colorWarning,
    [EventWorkflowStatus.START]: token.colorInfo,
    [EventWorkflowStatus.IN_PROGRESS]: token.colorBorder,
    [EventWorkflowStatus.FAILED]: token.colorError,
    [EventWorkflowStatus.COMPLETED]: borderColor,
  };

  const {
    data,
    onAdd,
    isDragStart,
    last,
    collect,
    formData,
    index,
    showAdd,
    status,
  } = props;

  const [step, setStep] = useState<AutomationStep>(data);

  useEffect(() => {
    setStep(data);
  }, [data]);

  return (
    <Flex
      gap="8px"
      vertical
      align="center"
      justify="center"
      style={{ width: "100%" }}
    >
      <AppSortableCard
        id={step.id}
        content={step.content({
          id: step.id,
          collect: collect,
          data: formData,
          index: index,
          disabled: props.disabled,
          eventWorkflow: props.eventWorkflow,
        })}
        label={step.label}
        setStep={setStep}
      >
        <Flex gap="20px" align="center">
          <AppIconHolder>{step.icon}</AppIconHolder>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {step.label}
          </Typography.Title>
        </Flex>
        {status && (
          <div
            style={{
              width: "8px",
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: StatusColor[status],
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            }}
          />
        )}
      </AppSortableCard>
      {!showAdd && <div style={{ height: "16px" }} />}
      {onAdd && showAdd && (
        <Flex
          vertical
          align="center"
          style={{ transition: "0.2s", opacity: isDragStart ? 0 : 1 }}
        >
          <Divider
            type="vertical"
            style={{
              borderLeft: `2px solid ${borderColor}`,
              height: stepLineHeight,
            }}
          />
          <Dropdown
            menu={{
              items: (AddStepMenu || []).map(
                (item) =>
                  ({ ...item, onClick: () => onAdd(item?.key) } as MenuItemType)
              ),
            }}
            trigger={["click"]}
          >
            <PlusCircleOutlined
              style={{ fontSize: "18px", color: borderColor }}
              className="hover"
            />
          </Dropdown>
          {!last && (
            <Divider
              type="vertical"
              style={{
                borderLeft: `2px solid ${borderColor}`,
                height: stepLineHeight,
              }}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};
