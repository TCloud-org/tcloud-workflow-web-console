import { SelectProps } from "antd";

export const PeriodOptions: SelectProps["options"] = [
  { value: "TODAY", label: "Today" },
  { value: "YESTERDAY", label: "Yesterday" },
  { value: "LAST_WEEK", label: "Last Week" },
  { value: "LAST_MONTH", label: "Last Month" },
];
