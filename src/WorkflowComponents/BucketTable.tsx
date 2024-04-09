import { MenuProps, Typography } from "antd";
import { Key, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditableColumn } from "../Config/LayoutConfig";
import { Route } from "../Config/WorkflowConfig";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppDropdown } from "../DataEntryComponents/AppDropdown";
import { AppLink } from "../DataEntryComponents/AppLink";
import { formatDate } from "../Utils/DateUtils";

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
    sorter: (a, b) =>
      new Date(a["createdAt"]).getTime() - new Date(b["createdAt"]).getTime(),
  },
];
export const BucketTable = (props: { routes?: Route[]; bucketId?: string }) => {
  const navigate = useNavigate();

  const { routes = [], bucketId } = props;

  const [selected, setSelected] = useState<Key[]>([]);

  const navigateBatch = (batchType: string) => {
    navigate(`/bucket/${batchType}`, {
      state: {
        workIds: selected,
        route: routes[0],
        bucketId,
      },
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={() => navigateBatch("batch-retry")}>Batch retry</div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => navigateBatch("batch-rerun")}>Batch rerun</div>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={() => navigateBatch("batch-transition")}>
          Batch transition
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div onClick={() => navigateBatch("batch-close")}>Batch close</div>
      ),
    },
  ];

  return (
    <AppTable
      titleToolDecorator={
        <AppDropdown disabled={selected.length === 0} items={items}>
          <AppButton
            tooltip={selected.length === 0 ? "Select an item" : undefined}
          >
            Batch
          </AppButton>
        </AppDropdown>
      }
      heading={bucketId}
      rows={routes}
      columns={columns}
      rowId="workId"
      selected={selected}
      setSelected={setSelected}
    />
  );
};
