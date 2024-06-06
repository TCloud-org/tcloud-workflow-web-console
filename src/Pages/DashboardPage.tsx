import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { getBilling, getInfraStat } from "Network/WorkflowFetch";
import { WorkPeriodToolbar } from "WorkflowComponents/WorkPeriodToolbar";
import { WorkStatisticDisplay } from "WorkflowComponents/WorkStatisticDisplay";
import { Flex } from "antd";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  InfraStatistic,
  StepWorkflowBilling,
  Work,
  WorkStatistic,
} from "../Config/WorkflowConfig";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppSpace } from "../LayoutComponents/AppSpace";
import {
  getWorkStatisticInDateRange,
  getWorksInDateRange,
} from "../Network/WorkFetch";

export const DashboardPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const start = searchParams.get("start") || undefined;
  const end = searchParams.get("end") || undefined;

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const period = useSelector((state: any) => state.dashboard.period);

  const [works, setWorks] = useState<Work[]>([]);
  const [selected, setSelected] = useState<Key[]>([]);
  const [statistic, setStatistic] = useState<WorkStatistic>();
  const [infraStatistic, setInfraStatistic] = useState<InfraStatistic>();
  const [infraStatisticLoading, setInfraStatisticLoading] =
    useState<boolean>(false);
  const [billing, setBilling] = useState<StepWorkflowBilling>();
  const [columns, setColumns] = useState<EditableColumn[]>(WorkColumns);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBilling = useCallback(async () => {
    if (clientId && authToken) {
      const res = await getBilling(clientId, authToken);
      setBilling(res.billing);
    }
  }, [clientId, authToken]);
  const fetchInfraStat = useCallback(async () => {
    if (clientId && authToken) {
      setInfraStatisticLoading(true);

      const res = await getInfraStat(clientId, authToken).catch((err) => {
        console.error(err);
        return undefined;
      });

      if (res?.infraStatistic) {
        setInfraStatistic(res.infraStatistic);
      }

      setInfraStatisticLoading(false);
    }
  }, [clientId, authToken]);

  const fetchWorksInRange = useCallback(async () => {
    if (((start && end) || period) && clientId) {
      setLoading(true);
      const workRes = await getWorksInDateRange(
        clientId,
        authToken,
        start,
        end,
        start ? undefined : period
      ).catch((err) => {
        console.error(err.response.status);
        return undefined;
      });
      const statRes = await getWorkStatisticInDateRange(
        clientId,
        authToken,
        start,
        end,
        start ? undefined : period
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
  }, [start, end, clientId, period, authToken]);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  useEffect(() => {
    fetchInfraStat();
  }, [fetchInfraStat]);

  useEffect(() => {
    fetchWorksInRange();
  }, [fetchWorksInRange]);

  const handleReload = () => {
    fetchBilling();
    fetchInfraStat();
    fetchWorksInRange();
  };

  return (
    <div>
      <AppSpace className="max-w-screen-2xl ml-auto mr-auto">
        <Flex className="w-full flex flex-col px-4">
          <PageTitle
            onReload={handleReload}
            endDecorator={<WorkPeriodToolbar />}
          >
            Welcome
          </PageTitle>
        </Flex>

        <WorkStatisticDisplay
          statistic={statistic}
          infraStatistic={infraStatistic}
          infraStatisticLoading={infraStatisticLoading}
          billing={billing}
        />

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
    </div>
  );
};
