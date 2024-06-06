import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
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

const PillColor = {
  green: "glass-success-pill",
  blue: "glass-info-pill",
  geekblue: "glass-info-pill",
  red: "glass-error-pill",
  gold: "glass-warning-pill",
};

export const AppTag = (props: CollapseTag) => {
  const color = PillColor[props.color as keyof typeof PillColor] || "";

  return (
    <Tooltip title={props.tooltip}>
      <div
        {...props}
        style={{
          whiteSpace: "normal",
          wordBreak: "break-all",
          ...props.style,
        }}
        className={`glass-pill px-3 py-0.5 flex items-center gap-2 ${color} ${props.className}`}
      >
        {props.icon} {props.children}
      </div>
    </Tooltip>
  );
};
