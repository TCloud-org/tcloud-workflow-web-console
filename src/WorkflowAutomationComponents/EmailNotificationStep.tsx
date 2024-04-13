import { PlusCircleOutlined } from "@ant-design/icons";
import {
  AddStepMenu,
  AutomationStep,
  borderColor,
  stepLineHeight,
} from "Config/AutomationConfig";
import { AppIconHolder } from "DataDisplayComponents/AppIconHolder";
import { AppSortableCard } from "DataEntryComponents/AppSortableCard";
import { Divider, Dropdown, Flex, Typography } from "antd";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { Key, useEffect, useState } from "react";

export const EmailNotificationStep = (props: {
  data: AutomationStep;
  onAdd?: (item: Key | undefined) => void;
  isDragStart?: boolean;
  last?: boolean;
}) => {
  const { data, onAdd, isDragStart, last } = props;

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
        content={step.content}
        label={step.label}
        setStep={setStep}
      >
        <Flex gap="20px" align="center">
          <AppIconHolder>{step.icon}</AppIconHolder>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {step.label}
          </Typography.Title>
        </Flex>
      </AppSortableCard>
      {onAdd && (
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
