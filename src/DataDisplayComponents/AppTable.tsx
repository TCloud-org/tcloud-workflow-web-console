import { Table, TableColumnsType } from "antd";
import { RowSelectMethod, SelectionSelectFn } from "antd/es/table/interface";
import { Key } from "react";
import { AppEditableRow } from "../DataEntryComponents/AppEditableRow";
import { AppEditableCell } from "../DataEntryComponents/AppEditableCell";

export const AppTable = (props: {
  selectionType?: "checkbox" | "radio";
  rows?: any[];
  columns?: TableColumnsType<any>;
  selected?: Key[] | undefined;
  onChange?: (
    selectedRowKeys: Key[],
    selectedRows: any[],
    info: {
      type: RowSelectMethod;
    }
  ) => void;
  onSelect?: SelectionSelectFn<any> | undefined;
}) => {
  const {
    selectionType = "checkbox",
    rows = [],
    columns = [],
    selected = [],
    onSelect,
    onChange,
  } = props;

  const components = {
    body: {
      row: AppEditableRow,
      cell: AppEditableCell,
    },
  };

  return (
    <Table
      components={components}
      rowClassName={() => "editable-row"}
      rowSelection={{
        type: selectionType,
        selectedRowKeys: selected,
        onSelect: onSelect,
        onChange: onChange,
      }}
      columns={columns}
      dataSource={rows}
    />
  );
};
