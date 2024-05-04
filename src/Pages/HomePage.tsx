import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { WorkPeriodToolbar } from "WorkflowComponents/WorkPeriodToolbar";
import { WorkStatisticDisplay } from "WorkflowComponents/WorkStatisticDisplay";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Work, WorkStatistic } from "../Config/WorkflowConfig";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppSpace } from "../LayoutComponents/AppSpace";
import {
  getWorkStatisticInDateRange,
  getWorksInDateRange,
} from "../Network/WorkFetch";
import { Alert, Typography, theme } from "antd";

export const HomePage = () => {
  const { token } = theme.useToken();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const start = searchParams.get("start") || undefined;
  const end = searchParams.get("end") || undefined;
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow?.workflow || {}
  );

  const [works, setWorks] = useState<Work[]>([]);
  const [selected, setSelected] = useState<Key[]>([]);
  const [statistic, setStatistic] = useState<WorkStatistic>();
  const [columns, setColumns] = useState<EditableColumn[]>(WorkColumns);
  const [loading, setLoading] = useState<boolean>(false);
  const [period, setPeriod] = useState<string | undefined>();

  const fetchWorksInRange = useCallback(async () => {
    if (((start && end) || period) && clientId && workflowId) {
      setLoading(true);
      const workRes = await getWorksInDateRange(
        clientId,
        workflowId,
        start,
        end,
        period
      );
      const statRes = await getWorkStatisticInDateRange(
        clientId,
        workflowId,
        start,
        end,
        period
      );
      setWorks(workRes.works);
      setColumns((prev: EditableColumn[]) =>
        prev.map((col) => {
          if (col.dataIndex !== "source") {
            return col;
          }
          return {
            ...col,
            customFilters: Object.keys(
              workRes.works.reduce((res: { [key: string]: string }, work) => {
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
      setStatistic(statRes.statistic);
      setLoading(false);
    } else {
      setStatistic(undefined);
      setWorks([]);
      setColumns([]);
    }
  }, [start, end, clientId, workflowId, period]);

  useEffect(() => {
    fetchWorksInRange();
  }, [fetchWorksInRange]);

  return (
    <AppSpace>
      <PageTitle>Welcome!</PageTitle>

      {!workflowId && (
        <Alert
          message="Notice"
          banner
          style={{ borderRadius: token.borderRadiusLG }}
          description={
            <Typography.Text>
              No workflow is currently activated. Please go to{" "}
              <Typography.Link href="/workflow">
                Step Workflow/Workflow
              </Typography.Link>{" "}
              and activate one.
            </Typography.Text>
          }
          type="warning"
          showIcon
          closable
        />
      )}

      <WorkPeriodToolbar period={period} setPeriod={setPeriod} />

      <WorkStatisticDisplay statistic={statistic} />

      <AppTable
        loading={loading}
        heading="Workflows"
        onReload={fetchWorksInRange}
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
