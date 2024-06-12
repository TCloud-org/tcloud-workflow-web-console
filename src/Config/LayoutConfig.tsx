import { Table } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import { ColumnFilterItem } from "antd/es/table/interface";

export const LogoImageUrl =
  "https://utfs.io/f/bd04c0a7-53fe-4f53-9c25-e44a5e0afb75-ejb435.png";
export const fullSpan = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 };
export const textColor = "#f8fafc";
export const borderColor = "#222c3f";

export const paginationConfig: PaginationConfig = {
  showSizeChanger: true,
  defaultPageSize: 10,
  showQuickJumper: true,
  pageSizeOptions: [5, 10, 25, 50, 100],
};

export type EditableTableProps = Parameters<typeof Table>[0];
export type EditableColumnTypes = Exclude<
  EditableTableProps["columns"],
  undefined
>;
export type EditableColumn = EditableColumnTypes[number] & {
  editable?: boolean;
  dataIndex?: string;
  handleSave?: (record: any) => void;
  customFilters?: ColumnFilterItem[];
};

export const SiderWidth = 250;
export const SiderCollapseWidth = 80;
export const HeaderHeight = 40;
