import { Table } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import { ColumnFilterItem } from "antd/es/table/interface";

export const LogoImageUrl = "https://tcw-icon.s3.us-west-2.amazonaws.com/7.png";
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
