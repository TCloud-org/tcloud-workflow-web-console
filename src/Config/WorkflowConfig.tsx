export type ResultType =
  | "success"
  | "failure"
  | "pending"
  | "default"
  | "notified"
  | undefined;

export interface Route {
  routeId: number;
  clientId: string;
  graphId: number;
  workflowId: number;
  workId: string;
  source: string;
  service: string;
  operation: string;
  resultType: string;
  resultName: string;
  workflowAlias: string;
  createdAt: string;
  version: number;
  runningOrder: number;
  executionTime: number;
  retryScheduleId: string;
  nextRetryAt: string;
  metadata: RouteMetadata;
}

export interface RouteMetadata {
  document: Document;
  documentEntityChangeLog: DocumentEntityChangeLog;
  workflowConfiguration: WorkflowRunConfiguration;
  error: string;
  notification: StateNotification;
  workflowRetryConfig: RetryConfig;
  stateRetryConfigMap: { [key: string]: RetryConfig };
}

export interface Document {
  documentId: string;
  documentBody: DocumentBody;
  documentState: DocumentState;
}

export interface DocumentBody {
  entities: { [key: string]: ArrayBuffer };
  changeLogs: DocumentEntityChangeLog[];
}

export interface DocumentEntityChangeLog {
  added: { [key: string]: ArrayBuffer };
  removed: { [key: string]: ArrayBuffer };
  modified: { [key: string]: ArrayBuffer };
  createdAt: string;
}

export interface DocumentState {
  states: ArrayBuffer[];
}

export interface WorkflowRunConfiguration {
  workflowConfiguration: Configuration;
  stateConfigurations: Configuration[];
  serviceConfigurations: Configuration[];
}

export interface Configuration {
  name: string;
  alias: string;
}

export interface StateNotification {
  resultType: string;
  resultName: string;
  document: Document;
  notifiedAt: string;
}

export interface RetryConfig {
  retryPolicyId: number;
  retryIndex: number;
}

export interface Graph {
  graphId: number;
  workflowId: number;
  clientId?: string;
  description?: string;
  alias?: string;
  xmlContent: string;
  parsedGraphResult?: XMLParsedGraphResult;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface XMLGraphStateResult {
  type: string;
  name: string;
  target: string;
}

export interface XMLGraphState {
  type: string;
  source: string;
  service: string;
  operation: string;
  runningOrder: number;
  duration: number;
  unit: string;
  resultMap: Map<string, XMLGraphStateResult>;
}

export interface XMLParsedGraphResult {
  initialState: string;
  result: Map<string, XMLGraphState>;
  retryPolicyId: number;
}

export enum WorkflowRunConfig {
  RetryWithConfiguration,
  RerunWithConfiguration,
}

export interface ServiceConfiguration {
  serviceId: number;
  serviceName: string;
  clientId: string;
  baseUrl: string;
  environment: Environment;
  alias: string;
  version: number;
  createdAt: string;
}

export enum Environment {
  PROD = "PROD",
  DEV = "DEV",
}
