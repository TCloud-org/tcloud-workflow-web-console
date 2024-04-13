import { MailOutlined } from "@ant-design/icons";
import { UniqueIdentifier } from "@dnd-kit/core";
import { InputNumber, MenuProps, Select, SelectProps } from "antd";
import { ReactNode } from "react";

export interface Utility {
  href?: string;
  label?: string;
  icon?: ReactNode;
}
export const WorkflowUtilities: Utility[] = [
  {
    href: "/workflow-automation/email-notification-workflow",
    label: "Email Notification Workflow",
    icon: <MailOutlined style={{ fontSize: "small" }} />,
  },
];

export interface AutomationStep {
  id: UniqueIdentifier;
  label?: string;
  fixed?: boolean;
  content?: ReactNode;
  removable?: boolean;
  hidden?: boolean;
  icon?: ReactNode;
}

export const borderColor = "#4312e5";
export const stepLineHeight = "8px";

export enum TimeUnit {
  NANOSECONDS = "NANOSECONDS",
  MICROSECONDS = "MICROSECONDS",
  MILLISECONDS = "MILLISECONDS",
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DAYS",
}

export const TimeUnits: SelectProps["options"] = [
  {
    label: "Nanoseconds",
    value: TimeUnit.NANOSECONDS,
  },
  {
    label: "Microseconds",
    value: TimeUnit.MICROSECONDS,
  },
  {
    label: "Milliseconds",
    value: TimeUnit.MILLISECONDS,
  },
  {
    label: "Seconds",
    value: TimeUnit.SECONDS,
  },
  {
    label: "Minutes",
    value: TimeUnit.MINUTES,
  },
  {
    label: "Hours",
    value: TimeUnit.HOURS,
  },
  {
    label: "Days",
    value: TimeUnit.DAYS,
  },
];

export const TriggerMethods: SelectProps["options"] = [
  {
    label: "Code",
    value: "code",
  },
  {
    label: "Webhook",
    value: "webhook",
  },
];

export const AddStepMenu: MenuProps["items"] = [
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Delay",
    key: "delay",
  },
];

export const EmailActions: SelectProps["options"] = [
  {
    label: "Send",
    value: "send",
  },
];

export const DelayOptions: SelectProps["options"] & { inputs?: any[] } = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Custom",
    value: "custom",
    inputs: [
      {
        label: "Unit",
        value: "unit",
        render: (props?: any) => (
          <Select
            placeholder="Select a time unit"
            options={TimeUnits}
            {...props}
          />
        ),
      },
      {
        label: "Time",
        value: "time",
        render: (props?: any) => (
          <InputNumber
            placeholder="Enter time"
            style={{ width: "100%" }}
            {...props}
          />
        ),
      },
    ],
  },
  {
    label: "1 minute",
    value: "1m",
  },
  {
    label: "5 minutes",
    value: "5m",
  },
  {
    label: "15 minutes",
    value: "15m",
  },
  {
    label: "30 minutes",
    value: "30m",
  },
  {
    label: "1 hour",
    value: "1h",
  },
  {
    label: "3 hours",
    value: "3h",
  },
  {
    label: "6 hours",
    value: "6h",
  },
  {
    label: "12 hours",
    value: "12h",
  },
  {
    label: "1 day",
    value: "1d",
  },
];
