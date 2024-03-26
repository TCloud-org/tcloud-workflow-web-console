import Title from "antd/es/typography/Title";
import { ReactNode } from "react";

export const PageTitle = (props: { children?: ReactNode }) => {
  return <Title level={3}>{props.children}</Title>;
};
