import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

export const AppSurfaceTitle = (props: TitleProps) => {
  return (
    <Typography.Title
      level={5}
      {...props}
      style={{ margin: 0, ...props.style }}
    />
  );
};
