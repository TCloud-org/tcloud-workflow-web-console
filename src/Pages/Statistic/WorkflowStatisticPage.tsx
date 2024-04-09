import { WorkColumns } from "Config/TableColumnConfig";
import { Work } from "Config/WorkflowConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { formatCamelCaseKey } from "Utils/ObjectUtils";
import { Key, useState } from "react";
import { useLocation } from "react-router-dom";

export const WorkflowStatisticPage = () => {
  const location = useLocation();
  const { name = "", data = [] }: { name: string; data: Work[] } =
    location.state || {};

  const [selected, setSelected] = useState<Key[]>([]);

  return (
    <AppSpace>
      <PageTitle>{formatCamelCaseKey(name)}</PageTitle>
      <AppTable
        rowId="workId"
        rows={data}
        columns={WorkColumns}
        selected={selected}
        setSelected={setSelected}
        showFilter
        showDownload
      />
    </AppSpace>
  );
};
