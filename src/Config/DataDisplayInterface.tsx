import { ReactNode } from "react";

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
  "2": { xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12 },
  "3": { xs: 8, sm: 8, md: 8, lg: 8, xl: 8, xxl: 8 },
};
