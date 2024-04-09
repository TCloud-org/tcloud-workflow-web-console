export interface RetryInput {
  label: string;
  value: keyof RetryPolicy;
  type?: string;
}

export interface RetryPolicyOption {
  label: string;
  value: {
    type: string;
    inputs: RetryInput[];
  };
  order: number;
  disabled?: boolean;
}

export interface RetryPolicyOptionsProps {
  FIXED_RETRY: RetryPolicyOption;
  EXPONENTIAL_BACKOFF: RetryPolicyOption;
  EXPONENTIAL_BACKOFF_WITH_JITTER: RetryPolicyOption;
  LINEAR_BACKOFF: RetryPolicyOption;
  CUSTOM_RETRY: RetryPolicyOption;
  CIRCUIT_BREAKER: RetryPolicyOption;
}

export const RetryPolicyOptions: RetryPolicyOptionsProps = {
  FIXED_RETRY: {
    label: "Fixed Retry",
    value: {
      type: "FIXED_RETRY",
      inputs: [
        { label: "Name", value: "name" },
        {
          label: "Number of retries",
          value: "numberOfRetries",
          type: "number",
        },
        { label: "Delay", value: "delay", type: "number" },
      ],
    },
    order: 1,
  },
  EXPONENTIAL_BACKOFF: {
    label: "Exponential Backoff",
    value: {
      type: "EXPONENTIAL_BACKOFF",
      inputs: [
        { label: "Name", value: "name" },
        { label: "Initial delay", value: "initialDelay", type: "number" },
        {
          label: "Multiplier factor",
          value: "multiplierFactor",
          type: "number",
        },
        { label: "Max retries", value: "maxRetries", type: "number" },
        { label: "Max delay", value: "maxDelay", type: "number" },
      ],
    },
    order: 2,
  },
  EXPONENTIAL_BACKOFF_WITH_JITTER: {
    label: "Exponential Backoff With Jitter",
    value: {
      type: "EXPONENTIAL_BACKOFF_WITH_JITTER",
      inputs: [
        { label: "Name", value: "name" },
        { label: "Initial delay", value: "initialDelay", type: "number" },
        {
          label: "Multiplier factor",
          value: "multiplierFactor",
          type: "number",
        },
        { label: "Max retries", value: "maxRetries", type: "number" },
        { label: "Max delay", value: "maxDelay", type: "number" },
      ],
    },
    order: 3,
  },
  LINEAR_BACKOFF: {
    label: "Linear Backoff",
    value: {
      type: "LINEAR_BACKOFF",
      inputs: [
        { label: "Name", value: "name" },
        { label: "Initial delay", value: "initialDelay", type: "number" },
        { label: "Delay increment", value: "delayIncrement", type: "number" },
        { label: "Max retries", value: "maxRetries", type: "number" },
        { label: "Max delay", value: "maxDelay", type: "number" },
      ],
    },
    order: 4,
  },
  CUSTOM_RETRY: {
    label: "Custom Retry",
    value: {
      type: "CUSTOM_RETRY",
      inputs: [
        { label: "Name", value: "name" },
        { label: "Max retries", value: "maxRetries", type: "number" },
        { label: "Retry conditions", value: "retryConditions", type: "number" },
        { label: "Delay strategy", value: "delayStrategy", type: "number" },
        { label: "Backoff strategy", value: "backoffStrategy", type: "number" },
      ],
    },
    disabled: true,
    order: 5,
  },
  CIRCUIT_BREAKER: {
    label: "Circuit Breaker",
    value: {
      type: "CIRCUIT_BREAKER",
      inputs: [
        { label: "Name", value: "name" },
        { label: "Threshold", value: "threshold", type: "number" },
        { label: "Reset time", value: "resetTime", type: "number" },
        {
          label: "Failure threshold",
          value: "failureThreshold",
          type: "number",
        },
        { label: "Retry interval", value: "retryInterval", type: "number" },
      ],
    },
    disabled: true,
    order: 6,
  },
};

export interface RetryPolicy {
  retryPolicyId: number;
  name: string;
  clientId: string;
  policyType: RetryPolicyType;
  numberOfRetries: number;
  delay: number;
  initialDelay: number;
  multiplierFactor: number;
  maxRetries: number;
  maxDelay: number;
  randomizationFactor: number;
  delayIncrement: number;
  retryConditions: string;
  delayStrategy: string;
  backoffStrategy: string;
  threshold: number;
  resetTime: number;
  failureThreshold: number;
  retryInterval: number;
  metadata: RetryPolicyMetadata;
}

export enum RetryPolicyType {
  FIXED_RETRY = "FixedRetry",
  EXPONENTIAL_BACKOFF = "ExponentialBackoff",
  EXPONENTIAL_BACKOFF_WITH_JITTER = "ExponentialBackoffWithJitter",
  LINEAR_BACKOFF = "LinearBackoff",
  CUSTOM_RETRY = "CustomRetry",
  CIRCUIT_BREAKER = "CircuitBreaker",
}

export interface RetryPolicyMetadata {
  retryStimulation: number[];
}

export interface GetRetryPoliciesByClientIdOutput {
  retryPolicies: RetryPolicy[];
}

export interface GetRetryPolicyByIdOutput {
  retryPolicy: RetryPolicy;
}

export interface RetryStimulationItem {
  attempt?: number;
  nextRetryIn?: number;
  interval?: number;
}
