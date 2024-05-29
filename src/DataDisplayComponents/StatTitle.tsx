import { Typography } from "antd";
import { CSSProperties, ReactElement, ReactNode, cloneElement } from "react";

export const StatTitle = (props: {
  children?: string | ReactNode;
  className?: string;
  icon?: ReactNode;
}) => {
  return (
    <Typography.Text
      className={`text-slate-700 font-semibold flex items-center gap-2 ${props.className}`}
    >
      {props.icon &&
        cloneElement(props.icon as ReactElement, {
          style: {
            fontSize: 16,
          } as CSSProperties,
        })}
      {props.children}
    </Typography.Text>
  );
};
