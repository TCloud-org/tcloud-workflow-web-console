import {
  DatePicker,
  Flex,
  Form,
  FormItemProps,
  SelectProps,
  Typography,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { Dayjs } from "dayjs";
import { ReactNode } from "react";

export const DateConditionOptions: ({
  render?: (props: FormItemProps) => ReactNode;
} & DefaultOptionType)[] = [
  {
    label: "BETWEEN",
    value: "BETWEEN",
    render: (props) => (
      <Flex gap="8px" style={{ flex: 1 }} align="center">
        <Form.Item
          name={[...props.name, "start"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Typography.Text>AND</Typography.Text>
        </Form.Item>

        <Form.Item
          name={[...props.name, "end"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Flex>
    ),
  },
  {
    label: ">",
    value: ">",
    render: (props) => (
      <Flex gap="8px" style={{ flex: 1 }} align="center">
        <Form.Item
          name={[...props.name, "start"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Flex>
    ),
  },
  {
    label: "<",
    value: "<",
    render: (props) => (
      <Flex gap="8px" style={{ flex: 1 }} align="center">
        <Form.Item
          name={[...props.name, "start"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Flex>
    ),
  },
  {
    label: ">=",
    value: ">=",
    render: (props) => (
      <Flex gap="8px" style={{ flex: 1 }} align="center">
        <Form.Item
          name={[...props.name, "start"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Flex>
    ),
  },
  {
    label: "<=",
    value: "<=",
    render: (props) => (
      <Flex gap="8px" style={{ flex: 1 }} align="center">
        <Form.Item
          name={[...props.name, "start"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Flex>
    ),
  },
  {
    label: "=",
    value: "=",
    render: (props) => (
      <Flex gap="8px" style={{ flex: 1 }} align="center">
        <Form.Item
          name={[...props.name, "start"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Flex>
    ),
  },
  {
    label: "!=",
    value: "!=",
    render: (props) => (
      <Flex gap="8px" style={{ flex: 1 }} align="center">
        <Form.Item
          name={[...props.name, "start"]}
          style={{ flex: 1, marginBottom: 0 }}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Flex>
    ),
  },
  {
    label: "IS NULL",
    value: "IS NULL",
  },
  {
    label: "IS NOT NULL",
    value: "IS NOT NULL",
  },
  {
    label: "IN",
    value: "IN",
  },
];

export const ListConditionOptions: SelectProps["options"] = [
  {
    label: "IN",
    value: "IN",
  },
  {
    label: "NOT IN",
    value: "NOT_IN",
  },
  {
    label: "IS NULL",
    value: "IS NULL",
  },
  {
    label: "IS NOT NULL",
    value: "IS NOT NULL",
  },
];

export const ConditionOptions: SelectProps["options"] = [
  {
    label: "=",
    value: "=",
  },
  {
    label: "!=",
    value: "!=",
  },
  {
    label: "IS NULL",
    value: "IS NULL",
  },
  {
    label: "IS NOT NULL",
    value: "IS NOT NULL",
  },
];

export const BitwiseOperatorOptions: SelectProps["options"] = [
  {
    label: "AND",
    value: "AND",
  },
  {
    label: "OR",
    value: "OR",
  },
];

export interface DateRange {
  start: string | Dayjs;
  end?: string | Dayjs;
}

export interface Clause {
  attribute: string;
  operator?: string;
  condition?: string;
  checkbox?: Record<string, boolean>;
  input?: any;
  date?: DateRange;
}
