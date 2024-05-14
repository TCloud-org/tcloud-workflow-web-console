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
      {props.icon && (
        <div className="h-6 w-6 bg-slate-500/10 flex justify-center items-center rounded-md">
          {cloneElement(props.icon as ReactElement, {
            style: {
              fontSize: 16,
            } as CSSProperties,
          })}
        </div>
      )}
      {props.children}
    </Typography.Text>
  );
};
