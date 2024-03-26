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
