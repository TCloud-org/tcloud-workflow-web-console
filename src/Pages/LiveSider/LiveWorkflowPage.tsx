import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Work } from "../../Config/WorkflowConfig";
import { AppTable } from "../../DataDisplayComponents/AppTable";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getWorksByClientId } from "../../Network/WorkFetch";

export const LiveWorkflowPage = () => {
  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);

  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Key[]>([]);
  const [columns, setColumns] = useState<EditableColumn[]>(WorkColumns);

  const fetchWorkIds = useCallback(async () => {
    if (!clientId) {
      return;
    }
    setLoading(true);

    const res = await getWorksByClientId(clientId, authToken);
    setWorks(res.works);
    setColumns((prev: EditableColumn[]) =>
      prev.map((col) => {
        if (col.dataIndex !== "source") {
          return col;
        }
        return {
          ...col,
          customFilters: Object.keys(
            res.works.reduce((res: { [key: string]: string }, work) => {
              res[work.source] = work.source;
              return res;
            }, {})
          ).map((state) => ({
            text: state,
            value: state,
          })),
        } as EditableColumn;
      })
    );
    setLoading(false);
  }, [clientId, authToken]);

  useEffect(() => {
    fetchWorkIds();
  }, [fetchWorkIds]);

  return (
    <AppSpace loading={loading}>
      <PageTitle>Work</PageTitle>
      <AppTable
        heading="Live"
        onReload={fetchWorkIds}
        rows={works}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        rowId="workId"
        showFilter
        showDownload
        exludedColumnsFromExport={{ metadata: true }}
      />
    </AppSpace>
  );
};
