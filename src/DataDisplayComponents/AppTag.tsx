import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import { CollapseTag } from "../Utils/ObjectUtils";

export const TagVariantMapping: { [key: string]: CollapseTag } = {
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
    color: "geekblue",
  },
  terminal: {
    icon: <CheckCircleOutlined />,
    color: "purple",
  },
  pending: {
    icon: <ClockCircleOutlined />,
    color: "warning",
  },
};

export const AppTag = (props: CollapseTag) => {
  return (
    <Tooltip title={props.tooltip}>
      <Tag
        bordered={false}
        {...props}
        style={{ margin: 0, wordBreak: "break-word", ...props.style }}
      >
        {props.children}
      </Tag>
    </Tooltip>
  );
};
