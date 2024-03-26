import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";
import { ResultType } from "../Config/WorkflowConfig";

const TagVariantMapping = {
  success: {
    icon: <CheckCircleOutlined />,
    color: "success",
  },
  failure: {
    icon: <CloseCircleOutlined />,
    color: "error",
  },
  notified: {
    icon: <BellOutlined />,
    color: "processing",
  },
  default: {
    icon: <MinusCircleOutlined />,
    color: "default",
  },
  terminal: {
    icon: <CheckCircleOutlined />,
    color: "default",
  },
  pending: {
    icon: <ClockCircleOutlined />,
    color: "warning",
  },
};

export const AppTag = (props: { type?: ResultType }) => {
  const { type = "default" } = props;
  return <Tag {...TagVariantMapping[type]}>{type}</Tag>;
};
