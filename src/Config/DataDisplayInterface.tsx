import { FormInstance } from "antd";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface TabItem {
  label: string;
  key: string;
  children: ReactNode;
}

export interface SelectItem {
  label: string;
  value: string;
}

export const Span = {
  "1": { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
  "2": { xs: 24, sm: 24, md: 24, lg: 12, xl: 12, xxl: 12 },
  "3": { xs: 24, sm: 24, md: 24, lg: 8, xl: 8, xxl: 8 },
  "4": { xs: 24, sm: 24, md: 24, lg: 6, xl: 6, xxl: 6 },
  "6": { xs: 24, sm: 24, md: 24, lg: 4, xl: 4, xxl: 4 },
  "8": { xs: 24, sm: 24, md: 24, lg: 3, xl: 3, xxl: 3 },
};

export type ListItem = {
  title?: string;
  href?: string;
};

export interface StepContentProps {
  form: FormInstance<any>;
  formData: { [key: string]: any };
  current: number;
  stepKey: string;
  setCurrent: Dispatch<SetStateAction<number>>;
}

export interface StepItem {
  key: string;
  title?: string;
  render: (props: StepContentProps) => ReactNode;
  required?: boolean;
}

export const GENERATED_ID_INPUT_TOOLTIP =
  "If this field is left empty, it will be automatically assigned a generated ID";
