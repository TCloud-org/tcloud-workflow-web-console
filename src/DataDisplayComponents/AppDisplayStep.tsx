import { Flex, Typography } from "antd";
import { AppStepBadge } from "./AppStepBadge";
import { CSSProperties, ReactElement, ReactNode, cloneElement } from "react";
import { borderColor } from "Config/AutomationConfig";

export interface AppDisplayStepProps {
  step?: number;
  icon?: ReactNode;
  description?: string;
}

export const AppDisplayStep = (props: AppDisplayStepProps) => {
  const { step, icon, description } = props;

  return (
    <Flex align="center" vertical gap={32}>
      <AppStepBadge step={step} />

      {icon && (
        <div
          style={{
            borderRadius: 100,
            backgroundColor: borderColor,
            padding: "24px",
          }}
        >
          {cloneElement(icon as ReactElement, {
            style: { fontSize: "32px", color: "white" } as CSSProperties,
          })}
        </div>
      )}

      <Typography.Text>{description}</Typography.Text>
    </Flex>
  );
};
