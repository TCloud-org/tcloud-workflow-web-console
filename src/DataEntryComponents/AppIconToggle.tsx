import { Button, Tooltip } from "antd";
import { ButtonProps } from "antd/es/button";
import { cloneElement } from "react";

export const AppIconToggle = (
  props: {
    width?: string | number | undefined;
    tooltip?: string;
    active?: boolean;
    onToggle?: () => void;
  } & ButtonProps
) => {
  const defaultStyle = { fontSize: "14px" };
  const mergedStyle = {
    ...defaultStyle,
    ...((props.children as any)?.props?.style || {}),
  };
  const modifiedChildren = cloneElement(props.children as any, {
    style: mergedStyle,
  });

  const handleOnClick = () => {
    if (props.onToggle) {
      props.onToggle();
    }
  };

  return (
    <Tooltip title={props.tooltip}>
      <Button
        loading={props.loading}
        onClick={handleOnClick}
        icon={modifiedChildren}
        style={{ width: props.width, ...props.style }}
        size={props.size}
        type={props.active ? "primary" : "default"}
        disabled={props.disabled}
        danger={props.danger}
      >
        {props.title}
      </Button>
    </Tooltip>
  );
};
