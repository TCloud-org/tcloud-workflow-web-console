export const fullSpan = { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 };

export type EditableColumn = Exclude<any, undefined>[number] & {
  editable?: boolean;
  dataIndex: string;
};
