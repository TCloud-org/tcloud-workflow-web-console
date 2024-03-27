import { Flex, MenuProps, Tooltip, Typography } from "antd";
import { Key, useState } from "react";
import { EditableColumn } from "../Config/LayoutConfig";
import { Route } from "../Config/WorkflowConfig";
import { AppCopy } from "../DataDisplayComponents/AppCopy";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppDropdown } from "../DataEntryComponents/AppDropdown";
import { AppLink } from "../DataEntryComponents/AppLink";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { formatDate } from "../Utils/DateUtils";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Batch retry
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Batch rerun
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Batch transition
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Batch close
      </a>
    ),
  },
];

const columns: EditableColumn[] = [
  {
    title: "Work Id",
    dataIndex: "workId",
    render: (workId: string) => (
      <AppLink href={`/live/${workId}`}>{workId}</AppLink>
    ),
  },
  {
    title: "Last Modified",
    dataIndex: "createdAt",
    render: (createdAt: string) => (
      <Typography.Text>{formatDate(createdAt)}</Typography.Text>
    ),
  },
];
export const BucketTable = (props: { routes?: Route[]; bucketId?: string }) => {
  const { routes = [], bucketId } = props;

  const [selected, setSelected] = useState<Key[]>([]);

  const renderTitle = () => {
    return (
      <Flex justify="space-between" align="center">
        {selected.length === 0 ? (
          <AppSpace direction="horizontal" size="small">
            <Tooltip title="Bucket serialized ID">
              <Typography.Text strong>{bucketId}</Typography.Text>
            </Tooltip>
            <AppCopy type="text" content={bucketId || ""} />
          </AppSpace>
        ) : (
          <Typography.Text
            strong
          >{`${selected.length} selected`}</Typography.Text>
        )}
        <AppSpace size="small">
          <AppDropdown disabled={selected.length === 0} items={items}>
            <AppButton
              tooltip={selected.length === 0 ? "Select an item" : undefined}
            >
              Batch
            </AppButton>
          </AppDropdown>
        </AppSpace>
      </Flex>
    );
  };
  return (
    <AppTable
      title={renderTitle}
      rows={routes}
      columns={columns}
      rowId="workId"
      selected={selected}
      setSelected={setSelected}
    />
  );
};
