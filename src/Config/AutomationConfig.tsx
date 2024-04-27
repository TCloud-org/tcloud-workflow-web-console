import {
  CalendarOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { UniqueIdentifier } from "@dnd-kit/core";
import { EmailTemplateForm } from "WorkflowAutomationComponents/ EmailTemplateForm";
import { DelayForm } from "WorkflowAutomationComponents/DelayForm";
import { TriggerForm } from "WorkflowAutomationComponents/TriggerForm";
import { InputNumber, MenuProps, Select, SelectProps } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { v4 } from "uuid";
import { EventWorkflow, EventWorkflowStatus } from "./EventWorkflowConfig";
import { VerificationForm } from "WorkflowAutomationComponents/VerificationForm";

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

export interface AutomationContentProps {
  id: UniqueIdentifier;
  data: any;
  collect: Dispatch<SetStateAction<any>>;
  index: number;
  disabled?: boolean;
  eventWorkflow?: EventWorkflow;
}

export interface AutomationStep {
  id: UniqueIdentifier;
  key: string;
  label?: string;
  fixed?: boolean;
  content: (props: AutomationContentProps) => ReactNode;
  removable?: boolean;
  hidden?: boolean;
  icon?: ReactNode;
  status?: EventWorkflowStatus;
  initial?: { [key: string]: string };
}

export const borderColor = "#4312e5";
export const stepLineHeight = "8px";

export enum DateUnit {
  YEARS = "Years",
  MONTHS = "Months",
  WEEKS = "Weeks",
  DAYS = "Days",
}

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
    label: "API",
    value: "API",
  },
  {
    label: "Webhook",
    value: "WEBHOOK",
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

export interface TemplateComponentProps {
  verification: AutomationStep;
  trigger: AutomationStep;
  email: AutomationStep;
  delay: AutomationStep;
}

export const TemplateComponent: TemplateComponentProps = {
  verification: {
    key: "verification",
    id: v4(),
    label: "Verification",
    fixed: true,
    content: (props: AutomationContentProps) => <VerificationForm {...props} />,
    icon: <IdcardOutlined />,
    initial: {
      type: "email",
    },
  },
  trigger: {
    key: "trigger",
    id: v4(),
    label: "Trigger",
    fixed: true,
    content: (props: AutomationContentProps) => <TriggerForm {...props} />,
    icon: <CalendarOutlined />,
    initial: {
      method: "API",
    },
  },
  email: {
    key: "email",
    id: v4(),
    label: "Email",
    content: (props: AutomationContentProps) => (
      <EmailTemplateForm {...props} />
    ),
    icon: <MailOutlined />,
    removable: true,
    initial: {
      action: "send",
    },
  },
  delay: {
    key: "delay",
    id: v4(),
    label: "Delay",
    content: (props: AutomationContentProps) => <DelayForm {...props} />,
    icon: <ClockCircleOutlined />,
    removable: true,
    initial: {
      delay: "none",
    },
  },
};

export const EmailNotificationTemplates: { [key: string]: AutomationStep[] } = {
  blank: [
    { ...TemplateComponent.verification, id: v4() },
    { ...TemplateComponent.trigger, id: v4() },
  ],
  basic: [
    { ...TemplateComponent.verification, id: v4() },
    { ...TemplateComponent.trigger, id: v4() },
    { ...TemplateComponent.email, id: v4() },
  ],
  delay: [
    { ...TemplateComponent.verification, id: v4() },
    { ...TemplateComponent.trigger, id: v4() },
    { ...TemplateComponent.delay, id: v4() },
    { ...TemplateComponent.email, id: v4() },
  ],
  consecutiveEmails: [
    { ...TemplateComponent.verification, id: v4() },
    { ...TemplateComponent.trigger, id: v4() },
    { ...TemplateComponent.email, id: v4() },
    { ...TemplateComponent.email, id: v4() },
  ],
  consecutiveEmailsWithDelay: [
    { ...TemplateComponent.verification, id: v4() },
    { ...TemplateComponent.trigger, id: v4() },
    { ...TemplateComponent.email, id: v4() },
    { ...TemplateComponent.delay, id: v4() },
    { ...TemplateComponent.email, id: v4() },
  ],
};

export enum ElementType {
  BLOCK_QUOTE = "BLOCK_QUOTE",
  BULLETED_LIST = "BULLETED_LIST",
  CHECK_LIST_ITEM = "CHECK_LIST_ITEM",
  EDITABLE_VOID = "EDITABLE_VOID",
  HEADING_ONE = "HEADING_ONE",
  HEADING_TWO = "HEADING_TWO",
  HEADING_THREE = "HEADING_THREE",
  HEADING_FOUR = "HEADING_FOUR",
  HEADING_FIVE = "HEADING_FIVE",
  HEADING_SIX = "HEADING_SIX",
  IMAGE = "IMAGE",
  LINK = "LINK",
  BUTTON = "BUTTON",
  BADGE = "BADGE",
  LIST_ITEM = "LIST_ITEM",
  NUMBERED_LIST = "NUMBERED_LIST",
  MENTION = "MENTION",
  PARAGRAPH = "PARAGRAPH",
  TABLE = "TABLE",
  TABLE_CELL = "TABLE_CELL",
  TABLE_ROW = "TABLE_ROW",
  TITLE = "TITLE",
  VIDEO = "VIDEO",
  CODE_BLOCK = "CODE_BLOCK",
  CODE_LINE = "CODE_LINE",
}
