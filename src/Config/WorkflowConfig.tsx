import { GraphState } from "WorkflowComponents/GraphBuilder";

export type ResultType =
  | "success"
  | "failure"
  | "pending"
  | "default"
  | "notified"
  | undefined;

export interface Workflow {
  workflowId: string;
  workflowName: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  nextAvailableVersion?: number;
  metadata?: WorkflowMetadata;
}

export interface WorkflowMetadata {
  retentionPeriod: RetentionPeriod;
}

export interface RetentionPeriod {
  period: number;
  unit: DateUnit;
}

export enum DateUnit {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
}

export interface Route {
  routeId: string;
  clientId: string;
  graphId: string;
  workflowId: string;
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
  workRequest: WorkRequest;
  error: string;
  notification: StateNotification;
  workflowRetryConfig: RetryConfig;
  stateRetryConfigMap: { [key: string]: RetryConfig };
  httpResponse: HttpResponse;
}

export interface HttpResponse {
  statusCode: number;
  status: string;
  reasonPhrase: string;
  latency: number;
}

export interface WorkRequest {
  workId: string;
  document: Document;
  endpoint: string;
  authorization: String;
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
  graphId: string;
  workflowId: string;
  clientId?: string;
  description?: string;
  alias?: string;
  xmlContent: string;
  graphArch?: GraphArch;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface GraphArch {
  xmlGraphFormat: XMLGraphFormat;
  uiBuilderGraphFormat: UIBuilderGraphFormat;
}

export interface XMLGraphFormat extends GraphFormat {
  xml: string;
}

export interface GraphFormat {
  workflowName: string;
}

export interface UIBuilderGraphFormat extends GraphFormat {
  retryPolicyId: number;
  states: GraphState[];
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
  Transition,
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
  PROD = "Production",
  DEV = "Development",
}

export interface GetGraphsByWorkflowIdOutput {
  graphs: Graph[];
  nextAvailableVersion: number;
  liveGraph: Graph;
}

export type ServiceConfigurationMap = { [key: string]: ServiceConfiguration[] };

export interface GetServiceConfigurationsByClientIdOutput {
  serviceConfigurationMap: ServiceConfigurationMap;
}

export interface GetConfigurationsByServiceNameOutput {
  configurations: ServiceConfiguration[];
  nextAvailableVersion: number;
  liveService: ServiceConfiguration;
}

export interface GetConfigurationByIdOutput {
  configuration: ServiceConfiguration;
}

export const EnvironmentOptions = Object.keys(Environment).map((key) => ({
  label: Environment[key as keyof typeof Environment],
  value: key,
}));

export interface GetWorkflowBucketsByClientIdAndWorkflowIdOutput {
  bucketMap: Record<string, Route[]>;
}

export interface WorkflowConfiguration {
  workflowConfigurationId: string;
  workId: string;
  clientId: string;
  workflowVersionConfig: Configuration;
  stateEndpointConfigMap: Record<string, Configuration>;
  serviceEndpointConfigMap: Record<string, Configuration>;
  workflowRetryConfig: RetryConfig;
  stateRetryConfigMap: Record<string, RetryConfig>;
  modifiedAt: string;
  version: number;
}

export interface GetWorkflowConfigurationOutput {
  configuration: WorkflowConfiguration;
}

export interface GetServicesFromGraphOutput {
  services: string[];
}

export interface RegisterWorkflowOutput {
  workflowId: string;
  clientId: string;
}

export const EndpointConfigTypes = [
  {
    label: "Service",
    value: "service",
  },
  {
    label: "State",
    value: "state",
  },
];

export interface GetGraphByIdOutput {
  graph: Graph;
  nextAvailableVersion: number;
}

export interface XMLVisualNodeData {
  label: string;
}

export interface XMLVisualNode {
  id: string;
  data: XMLVisualNodeData;
}

export interface XMLVisualEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface XMLTreeNode {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: XMLTreeNode[];
}

export interface ParseXMLForVisualizationOutput {
  nodes: XMLVisualNode[];
  edges: XMLVisualEdge[];
  treeNodes?: XMLTreeNode[];
  treeNodeIds?: string[];
}

export interface Work {
  workId: string;
  clientId: string;
  source: string;
  service: string;
  operation: string;
  resultType: string;
  resultName: string;
  graphId: string;
  workflowId: string;
  version: number;
  runningOrder: number;
  executionTime: number;
  createdAt: string;
  updatedAt: string;
  retryScheduleId: string;
  nextRetryAt: string;
  metadata: RouteMetadata;
}

export interface GetWorksByClientIdOutput {
  works: Work[];
}

export interface GetWorksByWorkflowIdOutput {
  works: Work[];
}

export interface GetWorksInDateRangeOutput {
  works: Work[];
}

export interface WorkStatistic {
  works: Work[];
  successes: Work[];
  progresses: Work[];
  failures: Work[];
}

export interface GetWorkStatisticInDateRangeOutput {
  statistic: WorkStatistic;
}

export interface QueryWorksOutput {
  works: Work[];
}

export interface InfraStatistic {
  totalWorkflows: number;
  totalGraphs: number;
  totalServices: number;
  totalRetryPolicies: number;
  totalAuthTokens: number;
}

export interface StepWorkflowBilling {
  totalTransitions: number;
  deductibleTransitions: number;
  pricePerUnit: number;
  cost: number;
  startDate: string;
}
