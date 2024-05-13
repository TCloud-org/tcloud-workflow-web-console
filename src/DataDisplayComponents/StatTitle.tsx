import { Typography } from "antd";

export const StatTitle = (props: { children?: string }) => {
  return (
    <Typography.Text className="text-slate-700 font-semibold">
      {props.children}
    </Typography.Text>
  );
};
