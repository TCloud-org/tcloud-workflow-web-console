import { TimeUnit } from "./AutomationConfig";

export interface EventWorkflow {
  id: number;
  name: string;
  clientId: string;
  metadata: EventWorkflowMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface EventWorkflowMetadata {
  steps: EventWorkflowStep[];
}

export interface EventWorkflowStep {
  type: string;
  delay?: Delay;
  email?: EmailTemplate;
}

export interface Delay {
  delay: string;
  custom: CustomTime;
}

export interface CustomTime {
  unit: TimeUnit;
  time: number;
}

export interface EmailTemplate {
  action: string;
  from: string;
  to: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  message: string;
}
