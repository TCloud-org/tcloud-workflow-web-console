import { ReactNode } from "react";

export const AppVerticalStepContent = (props: { children?: ReactNode }) => {
  return <div className="mt-2">{props.children}</div>;
};
