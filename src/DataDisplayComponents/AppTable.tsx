import { Table, TableColumnsType } from "antd";
import { SelectionSelectFn } from "antd/es/table/interface";
import { Dispatch, Key, SetStateAction } from "react";
import { EditableColumn } from "../Config/LayoutConfig";
import { AppEditableCell } from "../DataEntryComponents/AppEditableCell";
import { AppEditableRow } from "../DataEntryComponents/AppEditableRow";

export const AppTable = (props: {
  selectionType?: "checkbox" | "radio";
  rows?: any[];
  columns?: TableColumnsType<any>;
  selected?: Key[] | undefined;
  setSelected?: Dispatch<SetStateAction<Key[]>>;
  onSelect?: SelectionSelectFn<any> | undefined;
  rowId?: string | undefined;
}) => {
  const {
    selectionType = "checkbox",
    rows = [],
    columns = [],
    selected = [],
    setSelected = () => {},
    onSelect,
    rowId = "",
  } = props;

  const components = {
    body: {
      row: AppEditableRow,
      cell: AppEditableCell,
    },
  };

  const editableColumns = columns.map((col: EditableColumn, i) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: col.handleSave,
      }),
    };
  });

  const onChange = (selectedRowKeys: Key[]) => {
    setSelected(selectedRowKeys);
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
      columns={editableColumns}
      dataSource={rows.map((row, i) => ({ ...row, key: row[rowId] || i }))}
    />
  );
};
