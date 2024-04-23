import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Work } from "../../Config/WorkflowConfig";
import { AppTable } from "../../DataDisplayComponents/AppTable";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getWorksByClientIdAndWorkflowId } from "../../Network/WorkFetch";

export const LiveWorkflowPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Key[]>([]);
  const [columns, setColumns] = useState<EditableColumn[]>(WorkColumns);

  const fetchWorkIds = useCallback(async () => {
    if (!workflowId) {
      return;
    }
    setLoading(true);

    const res = await getWorksByClientIdAndWorkflowId(clientId, workflowId);
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
  }, [workflowId, clientId]);

  useEffect(() => {
    fetchWorkIds();
  }, [fetchWorkIds]);

  return (
    <AppSpace loading={loading}>
      <PageTitle>{workflowName}</PageTitle>
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
