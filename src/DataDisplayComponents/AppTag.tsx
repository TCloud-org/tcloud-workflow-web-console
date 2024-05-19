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
    color: "green",
  },
  failure: {
    icon: <CloseCircleOutlined />,
    color: "red",
  },
  notified: {
    icon: <BellOutlined />,
    color: "blue",
  },
  default: {
    icon: <MinusCircleOutlined />,
    color: "geekblue",
  },
  terminal: {
    icon: <CheckCircleOutlined />,
    color: "green",
  },
  pending: {
    icon: <ClockCircleOutlined />,
    color: "gold",
  },
};

export const AppTag = (props: CollapseTag) => {
  return (
    <Tooltip title={props.tooltip}>
      <Tag
        {...props}
        style={{
          margin: 0,
          whiteSpace: "normal",
          wordBreak: "break-all",
          ...props.style,
        }}
        className={props.className}
      >
        {props.children}
      </Tag>
    </Tooltip>
  );
};
