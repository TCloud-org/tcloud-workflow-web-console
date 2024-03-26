import { Button, Tooltip } from "antd";
import { ButtonType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ReactNode, cloneElement } from "react";

export const AppIconButton = (props: {
  children?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
  size?: SizeType;
  tooltip?: string;
  type?: ButtonType;
  width?: string | number | undefined;
  disabled?: boolean | undefined;
  danger?: boolean | undefined;
}) => {
  const defaultStyle = { fontSize: "14px" };
  const mergedStyle = {
    ...defaultStyle,
    ...((props.children as any)?.props?.style || {}),
  };
  const modifiedChildren = cloneElement(props.children as any, {
    style: mergedStyle,
  });

  return (
    <Tooltip placement="bottom" title={props.tooltip}>
      <Button
        loading={props.loading}
        onClick={props.onClick}
        icon={modifiedChildren}
        style={{ width: props.width }}
        size={props.size}
        type={props.type}
        disabled={props.disabled}
        danger={props.danger}
      />
    </Tooltip>
  );
};
