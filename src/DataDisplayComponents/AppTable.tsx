import {
  DownloadOutlined,
  FilterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppIconToggle } from "DataEntryComponents/AppIconToggle";
import { AppResizableHeader } from "DataEntryComponents/AppResizableHeader";
import { generateBlob } from "Utils/ObjectUtils";
import { WorkflowFilterToolbar } from "WorkflowComponents/WorkflowFilterToolbar";
import { Table, TableColumnsType, TableProps } from "antd";
import { RowSelectMethod, SelectionSelectFn } from "antd/es/table/interface";
import { saveAs } from "file-saver";
import { Dispatch, Key, ReactNode, SetStateAction, useState } from "react";
import { ResizeCallbackData } from "react-resizable";
import { EditableColumn, EditableColumnTypes } from "../Config/LayoutConfig";
import { AppEditableCell } from "../DataEntryComponents/AppEditableCell";
import { AppEditableRow } from "../DataEntryComponents/AppEditableRow";
import { TableTitle } from "./TableTitle";
import { WorkflowSettingsToolbar } from "WorkflowComponents/WorkflowSettingsToolbar";

const TableComponents: TableProps["components"] = {
  body: {
    row: AppEditableRow,
    cell: AppEditableCell,
  },
  header: {
    cell: AppResizableHeader,
  },
};

export const AppTable = (
  props: {
    selectionType?: "checkbox" | "radio";
    rows?: any[];
    columns?: EditableColumn[];
    selected?: Key[] | undefined;
    setSelected?: Dispatch<SetStateAction<Key[]>>;
    onSelect?: SelectionSelectFn<any> | undefined;
    rowId?: string | undefined;
    heading?: string;
    bordered?: boolean | undefined;
    defaultPageSize?: 5 | 10 | 25 | 50 | 100;
    onReload?: () => void;
    showFilter?: boolean;
    showDownload?: boolean;
    exludedColumnsFromExport?: { [key: string]: boolean };
    showSettings?: boolean;
    titleToolDecorator?: ReactNode;
    showSelected?: boolean;
    showTitle?: boolean;
  } & TableProps
) => {
  const {
    selectionType = "checkbox",
    rows = [],
    columns = [],
    selected = [],
    setSelected = () => {},
    onSelect,
    rowId = "",
    heading,
    bordered,
    defaultPageSize = 10,
    onReload,
    showFilter,
    showDownload,
    exludedColumnsFromExport = {},
    showSettings = true,
    titleToolDecorator,
    showSelected = true,
    showTitle = true,
  } = props;

  const [mergedColumns, setMergedColumns] = useState<EditableColumn[]>([
    ...columns,
  ]);
  const [filtered, setFiltered] = useState<{
    [dataIndex: string]: { [value: string]: boolean };
  }>({});
  const [filteredActive, setFilteredActive] = useState<boolean>(false);
  const [settingsActive, setSettingsActive] = useState<boolean>(false);

  const data = rows.map((row, i) => ({ ...row, key: row[rowId] || i }));

  const editableColumns = mergedColumns.map((col: EditableColumn, i) => {
    const newCol: EditableColumn = {
      ...col,
      sortDirections: ["ascend", "descend", "ascend"],
      defaultSortOrder: "descend",
      onHeaderCell: (column: TableColumnsType<any>[number]) => ({
        width: column.width,
        onResize: handleResize(i) as React.ReactEventHandler<any>,
      }),
    };
    if (!col.editable) {
      return newCol;
    }
    return {
      ...newCol,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: col.handleSave,
      }),
    };
  });

  const onSelectedChange = (
    selectedRowKeys: Key[],
    _: any[],
    info: {
      type: RowSelectMethod;
    }
  ) => {
    if (info.type === "all") {
      if (selected.length !== data.length) {
        setSelected(data.map((item) => item.key as Key));
      } else {
        setSelected([]);
      }
    } else {
      setSelected(selectedRowKeys);
    }
  };

  const handleResize: Function =
    (index: number) =>
    (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns = [...mergedColumns];
      newColumns[index] = {
        ...newColumns[index],
        width: size.width,
      };
      setMergedColumns(newColumns);
    };

  const handleDownload = () => {
    const blob = generateBlob(rows, exludedColumnsFromExport);
    saveAs(blob, "data.csv");
  };

  const handleFilterClick = () => {
    if (!filteredActive) {
      setSettingsActive(false);
    }
    setFilteredActive((prev) => !prev);
  };

  const handleSettingsClick = () => {
    if (!settingsActive) {
      setFilteredActive(false);
    }
    setSettingsActive((prev) => !prev);
  };

  const renderTitle = () => {
    return (
      <div>
        <TableTitle
          onReload={onReload}
          endDecorator={
            <>
              {titleToolDecorator}
              {showDownload && (
                <AppIconButton
                  tooltip="Download as CSV"
                  onClick={handleDownload}
                  title="Export"
                >
                  <DownloadOutlined />
                </AppIconButton>
              )}
              {showFilter && (
                <AppIconToggle
                  tooltip="Filter"
                  onToggle={handleFilterClick}
                  title="Filter"
                  active={filteredActive}
                >
                  <FilterOutlined />
                </AppIconToggle>
              )}
            </>
          }
          afterReloadDecorator={
            showSettings && (
              <AppIconToggle
                tooltip="Settings"
                onToggle={handleSettingsClick}
                active={settingsActive}
              >
                <SettingOutlined />
              </AppIconToggle>
            )
          }
        >
          {heading}
        </TableTitle>

        <WorkflowSettingsToolbar
          rows={rows}
          columns={editableColumns as EditableColumn[]}
          active={settingsActive}
        />

        <WorkflowFilterToolbar
          columns={columns}
          rows={rows}
          show={filteredActive}
          filtered={filtered}
          setFiltered={setFiltered}
        />
      </div>
    );
  };

  const anyFilters = (): boolean => {
    return Object.values(filtered).some((filter) =>
      Object.values(filter).some((checked) => checked === true)
    );
  };

  return (
    <Table
      title={showTitle ? () => renderTitle() : undefined}
      style={props.style}
      components={TableComponents}
      rowClassName={() => "editable-row"}
      bordered={bordered}
      pagination={{
        showSizeChanger: true,
        defaultPageSize: defaultPageSize,
        pageSizeOptions: [5, 10, 25, 50, 100],
        showQuickJumper: true,
      }}
      rowSelection={
        showSelected
          ? {
              type: selectionType,
              selectedRowKeys: selected,
              onSelect: onSelect,
              onChange: onSelectedChange,
            }
          : undefined
      }
      columns={editableColumns as EditableColumnTypes}
      dataSource={data.filter((work) => {
        return (
          !anyFilters() ||
          Object.entries(filtered).some(
            ([dataIndex, filter]) => filter[work[dataIndex] as string]
          )
        );
      })}
      onChange={props.onChange}
      loading={props.loading}
      scroll={{ x: 1000 }}
      size="small"
    />
  );
};
