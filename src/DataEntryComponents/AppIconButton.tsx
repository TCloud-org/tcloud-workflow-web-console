import { Button, Tooltip } from "antd";
import { ButtonProps } from "antd/es/button";
import { cloneElement } from "react";

export const AppIconButton = (
  props: {
    width?: string | number | undefined;
    tooltip?: string;
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

  return (
    <Tooltip title={props.tooltip}>
      <Button
        id={props.id}
        loading={props.loading}
        onClick={props.onClick}
        icon={modifiedChildren}
        style={{ width: props.width, ...props.style }}
        size={props.size}
        type={props.type}
        disabled={props.disabled}
        danger={props.danger}
      >
        {props.title}
      </Button>
    </Tooltip>
  );
};
