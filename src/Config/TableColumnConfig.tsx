import { formatDate } from "Utils/DateUtils";
import { EditableColumn } from "./LayoutConfig";
import { AppTag, TagVariantMapping } from "DataDisplayComponents/AppTag";
import { AppLink } from "DataEntryComponents/AppLink";

export const WorkColumns: EditableColumn[] = [
  {
    title: "Work ID",
    dataIndex: "workId",
    render: (text: string) => (
      <AppLink href={`/live/${encodeURIComponent(text)}`}>{text}</AppLink>
    ),
  },
  {
    title: "Source",
    dataIndex: "source",
    sorter: (a, b) => a["source"].localeCompare(b["source"]),
  },
  {
    title: "Result Type",
    dataIndex: "resultType",
    customFilters: Object.keys(TagVariantMapping).map((resultType) => ({
      text: resultType,
      value: resultType,
    })),
    render: (text: string) => (
      <AppTag
        color={TagVariantMapping[text].color}
        icon={TagVariantMapping[text].icon}
      >
        {text}
      </AppTag>
    ),
    sorter: (a, b) => a["resultType"].localeCompare(b["resultType"]),
  },
  {
    title: "Modified",
    dataIndex: "createdAt",
    render: (text: string) => formatDate(text),
    width: 300,
    sorter: (a, b) =>
      new Date(a["createdAt"] * 1000).getTime() -
      new Date(b["createdAt"] * 1000).getTime(),
  },
];
