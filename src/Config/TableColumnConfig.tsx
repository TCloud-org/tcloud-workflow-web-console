import { formatDate } from "Utils/DateUtils";
import { EditableColumn } from "./LayoutConfig";
import { AppTag, TagVariantMapping } from "DataDisplayComponents/AppTag";
import { AppLink } from "DataEntryComponents/AppLink";

export const WorkColumns: EditableColumn[] = [
  {
    title: "Work ID",
    dataIndex: "workId",
    width: "25%",
    render: (text: string) => (
      <AppLink href={`/live/${encodeURIComponent(text)}`}>{text}</AppLink>
    ),
  },
  {
    title: "Client",
    dataIndex: "clientId",
  },
  {
    title: "Workflow",
    dataIndex: "workflowId",
  },
  {
    title: "State",
    dataIndex: "source",
    sorter: (a, b) => a["source"].localeCompare(b["source"]),
  },
  {
    title: "Result",
    dataIndex: "resultType",
    customFilters: Object.keys(TagVariantMapping).map((resultType) => ({
      text: resultType,
      value: resultType,
    })),
    render: (text: string) => (
      <AppTag color={TagVariantMapping[text].color}>{text}</AppTag>
    ),
    sorter: (a, b) => a["resultType"].localeCompare(b["resultType"]),
  },
  {
    title: "Modified",
    dataIndex: "createdAt",
    render: (text: string) => formatDate(text),
    sorter: (a, b) =>
      new Date(a["createdAt"] * 1000).getTime() -
      new Date(b["createdAt"] * 1000).getTime(),
  },
];
