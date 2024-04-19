import { Descendant } from "slate";
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
  type: EventWorkflowStepType;
  form?: EventWorkflowForm;
}

export interface EventWorkflowForm {
  id: string;
}

export interface TriggerForm extends EventWorkflowForm {
  method: EventWorkflowTriggerMethod;
}

export interface EmailForm extends EventWorkflowForm {
  action: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  message: Descendant[];
}

export interface DelayForm extends EventWorkflowForm {
  delay: string;
  custom: CustomTime;
}

export interface CustomTime {
  unit: TimeUnit;
  time: number;
}

export enum EventWorkflowTriggerMethod {
  CODE = "code",
  WEBHOOK = "webhook",
}

export enum EventWorkflowStepType {
  EMAIL = "email",
  DELAY = "delay",
  TRIGGER = "trigger",
}

export interface EventWorkflowStage {
  stageId: number;
  jobId: number;
  clientId: string;
  step: EventWorkflowStep;
  stepIndex: number;
  status: EventWorkflowStatus;
  executedAt: string;
}

export enum EventWorkflowStatus {
  START = "START",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
  SUCCESSFUL = "SUCCESSFUL",
}
