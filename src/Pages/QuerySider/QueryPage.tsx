import { Clause } from "Config/FilterConfig";
import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { Work } from "Config/WorkflowConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { queryWorks } from "Network/WorkFetch";
import { noFilters, transformClausesDate } from "Utils/ObjectUtils";
import { WorkFilterBuilder } from "WorkflowComponents/WorkFilterBuilder";
import { WorkFilterDisplay } from "WorkflowComponents/WorkFilterDisplay";
import { WorkSavedFilterList } from "WorkflowComponents/WorkSavedFilterList";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const QueryPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);
  const { saved, active = -1 }: { saved: Clause[][]; active?: number } =
    useSelector((state: any) => state.workFilter);

  const [clauses, setClauses] = useState<Clause[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [columns, setColumns] = useState<EditableColumn[]>(WorkColumns);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Key[]>([]);
  const [isInitialStart, setIsInitialStart] = useState<boolean>(true);

  const fetchQueriedWorks = useCallback(async () => {
    setLoading(true);

    const res = await queryWorks(clientId, workflowId, clauses);
    setWorks(res?.works || []);
    setColumns((prev: EditableColumn[]) =>
      prev.map((col) => {
        if (col.dataIndex !== "source") {
          return col;
        }
        return {
          ...col,
          customFilters: Object.keys(
            (res?.works || []).reduce(
              (res: { [key: string]: string }, work) => {
                res[work.source] = work.source;
                return res;
              },
              {}
            )
          ).map((state) => ({
            text: state,
            value: state,
          })),
        } as EditableColumn;
      })
    );

    setLoading(false);
  }, [clientId, workflowId, clauses]);

  useEffect(() => {
    fetchQueriedWorks();
  }, [fetchQueriedWorks]);

  useEffect(() => {
    if (isInitialStart) {
      if (active >= 0 && active < saved.length) {
        setClauses(transformClausesDate(saved[active]));
      } else {
        setClauses([]);
      }
      setIsInitialStart(false);
    }
  }, [active, saved, isInitialStart]);

  return (
    <AppSpace>
      <PageTitle>Query</PageTitle>

      <WorkSavedFilterList />

      {!noFilters(clauses) && (
        <WorkFilterDisplay data={clauses} setClauses={setClauses} />
      )}

      <WorkFilterBuilder
        clauses={clauses}
        data={works}
        setClauses={setClauses}
      />

      <AppTable
        loading={loading}
        heading="Workflows"
        onReload={fetchQueriedWorks}
        rows={works}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        rowId="workId"
        defaultPageSize={25}
        showFilter
        showDownload
        exludedColumnsFromExport={{ metadata: true }}
      />
    </AppSpace>
  );
};
