import { Button, ButtonProps, Tooltip } from "antd";
import { TooltipPlacement } from "antd/es/tooltip";

interface AppButtonProps extends ButtonProps {
  tooltip?: string;
  placement?: TooltipPlacement;
}

export const AppButton = (props: AppButtonProps) => {
  return (
    <Tooltip placement={props.placement} title={props.tooltip}>
      <Button
        disabled={props.disabled}
        type={props.type}
        danger={props.danger}
        onClick={props.onClick}
        loading={props.loading}
        icon={props.icon}
        style={props.style}
        color={props.color}
        size={props.size}
        className={props.className}
      >
        {props.children}
      </Button>
    </Tooltip>
  );
};
