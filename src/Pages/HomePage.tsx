import { createSpan } from "Config/DataDisplayInterface";
import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { WorkPeriodToolbar } from "WorkflowComponents/WorkPeriodToolbar";
import { WorkStatisticDisplay } from "WorkflowComponents/WorkStatisticDisplay";
import { Alert, Col, Statistic, Typography, theme } from "antd";
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

export const HomePage = () => {
  const { token } = theme.useToken();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const start = searchParams.get("start") || undefined;
  const end = searchParams.get("end") || undefined;
  const authToken = useSelector((state: any) => state.auth.token);
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
        authToken,
        start,
        end,
        period
      ).catch((err) => {
        console.error(err.response.status);
        return undefined;
      });
      const statRes = await getWorkStatisticInDateRange(
        clientId,
        workflowId,
        authToken,
        start,
        end,
        period
      ).catch((err) => {
        console.error(err.response.status);
        return undefined;
      });
      setWorks(workRes?.works || []);
      setColumns((prev: EditableColumn[]) =>
        prev.map((col) => {
          if (col.dataIndex !== "source") {
            return col;
          }
          return {
            ...col,
            customFilters: Object.keys(
              (workRes?.works || []).reduce(
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
      setStatistic(statRes?.statistic);
      setLoading(false);
    } else {
      setStatistic(undefined);
      setWorks([]);
      setColumns([]);
    }
  }, [start, end, clientId, workflowId, period, authToken]);

  useEffect(() => {
    fetchWorksInRange();
  }, [fetchWorksInRange]);

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <WorkPeriodToolbar period={period} setPeriod={setPeriod} />
        }
      >
        Welcome
      </PageTitle>

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

      <WorkStatisticDisplay statistic={statistic} />

      <AppRow gutter={[16, 16]}>
        <Col {...createSpan(8)} className="flex flex-col">
          <AppCard size="small" className="h-full">
            <Statistic
              title={
                <Typography.Text className="text-slate-700 font-semibold">
                  Result Distribution Chart
                </Typography.Text>
              }
              valueStyle={{
                fontSize: "14px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
              valueRender={(_) =>
                !statistic || statistic.totalWorks === 0 ? (
                  <AppEmpty />
                ) : (
                  <AppPieChart
                    data={[
                      {
                        name: "Success",
                        value: statistic?.successes.length,
                        fill: token.colorSuccess,
                      },
                      {
                        name: "In Progress",
                        value: statistic?.progresses.length,
                        fill: token.colorWarning,
                      },
                      {
                        name: "Failure",
                        value: statistic?.failures.length,
                        fill: token.colorError,
                      },
                    ]}
                    width={350}
                    height={300}
                  />
                )
              }
            />
          </AppCard>
        </Col>

        <Col {...createSpan(16)} className="flex flex-col">
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
        </Col>
      </AppRow>
    </AppSpace>
  );
};
