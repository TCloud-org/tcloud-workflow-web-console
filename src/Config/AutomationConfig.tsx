import { MailOutlined } from "@ant-design/icons";
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
