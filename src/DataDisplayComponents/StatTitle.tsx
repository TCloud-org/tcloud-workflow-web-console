import { Typography } from "antd";
import { ReactElement, ReactNode, cloneElement } from "react";

export const StatTitle = (props: {
  children?: string | ReactNode;
  className?: string;
  icon?: ReactNode;
}) => {
  return (
    <Typography.Text
      className={`text-white font-semibold flex flex-col gap-8 ${props.className}`}
    >
      {props.icon && (
        <div className="h-16 w-16 glass-card border border-neutral-11 !rounded-md flex justify-center items-center">
          {cloneElement(props.icon as ReactElement, {
            className: "!text-white",
            style: {
              fontSize: 32,
            },
          })}
        </div>
      )}
      <div className="text-lg">{props.children}</div>
    </Typography.Text>
  );
};
