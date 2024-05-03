import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import { CollapseTag } from "../Utils/ObjectUtils";
import { borderColor } from "Config/AutomationConfig";

export const TagVariantMapping: { [key: string]: CollapseTag } = {
  success: {
    icon: <CheckCircleOutlined />,
    color: "green-inverse",
  },
  failure: {
    icon: <CloseCircleOutlined />,
    color: "red-inverse",
  },
  notified: {
    icon: <BellOutlined />,
    color: "blue-inverse",
  },
  default: {
    icon: <MinusCircleOutlined />,
    color: "geekblue-inverse",
  },
  terminal: {
    icon: <CheckCircleOutlined />,
    color: borderColor,
  },
  pending: {
    icon: <ClockCircleOutlined />,
    color: "gold-inverse",
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
