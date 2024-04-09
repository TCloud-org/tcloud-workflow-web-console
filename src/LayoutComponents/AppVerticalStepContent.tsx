import { ReactNode } from "react";

export const AppVerticalStepContent = (props: { children?: ReactNode }) => {
  return <div style={{ margin: "24px 0" }}>{props.children}</div>;
};
