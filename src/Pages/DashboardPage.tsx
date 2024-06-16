import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { getBilling, getInfraStat } from "Network/WorkflowFetch";
import { WorkPeriodToolbar } from "WorkflowComponents/WorkPeriodToolbar";
import { WorkStatisticDisplay } from "WorkflowComponents/WorkStatisticDisplay";
import { Flex } from "antd";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { Account } from "features/auth/authSlice";

export const DashboardPage = () => {
  const authToken = useSelector((state: any) => state.auth.token);
  const account: Account = useSelector((state: any) => state.auth.account);
  const clientId = useSelector((state: any) => state.client.clientId);
  const period = useSelector((state: any) => state.dashboard.period);
  const dateRange = useSelector((state: any) => state.dashboard.dateRange);

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
    if (account.email && authToken) {
      const res = await getBilling(account.email, authToken);
      setBilling(res.billing);
    }
  }, [account, authToken]);

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
    if ((dateRange || period) && clientId) {
      setLoading(true);
      const start = dateRange?.[0];
      const end = dateRange?.[1];
      const workRes = await getWorksInDateRange(
        clientId,
        authToken,
        start,
        end,
        start ? undefined : period
      ).catch((err) => {
        return undefined;
      });
      const statRes = await getWorkStatisticInDateRange(
        clientId,
        authToken,
        start,
        end,
        start ? undefined : period
      ).catch((err) => {
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
  }, [dateRange, clientId, period, authToken]);

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
