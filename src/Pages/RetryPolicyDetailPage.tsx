import { Descriptions, Flex } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AxisOptions, Chart } from "react-charts";
import { useParams } from "react-router-dom";
import { Span } from "../Config/DataDisplayInterface";
import { EditableColumn } from "../Config/LayoutConfig";
import {
  RetryPolicy,
  RetryPolicyOptions,
  RetryPolicyOptionsProps,
  RetryStimulationItem,
} from "../Config/RetryConfig";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { PageTitle } from "../DataDisplayComponents/PageTitle";
import { TableTitle } from "../DataDisplayComponents/TableTitle";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { getRetryPolicy } from "../Network/RetryFetch";
import { formatTime, formatTimeShort } from "../Utils/DateUtils";

const columns: EditableColumn[] = [
  {
    title: "Attempt",
    dataIndex: "attempt",
  },
  {
    title: "Interval",
    dataIndex: "interval",
    render: (text: string) => formatTime(text),
    width: "33%",
  },
  {
    title: "Next Retry",
    dataIndex: "nextRetryIn",
    render: (text: string) => formatTime(text),
    width: "33%",
  },
];

export const RetryPolicyDetailPage = () => {
  const { retryPolicyId } = useParams();

  const [retryPolicy, setRetryPolicy] = useState<RetryPolicy>();
  const [retryPolicyDescriptions, setRetryPolicyDescriptions] = useState<any[]>(
    []
  );
  const [retryStimulationItems, setRetrySimulationItems] = useState<
    RetryStimulationItem[]
  >([]);
  const [retryStimulationData, setRetrySimulationData] = useState<any[]>([]);

  const fetchRetryPolicy = useCallback(async () => {
    if (retryPolicyId) {
      const data = await getRetryPolicy(retryPolicyId);
      const policy = data?.retryPolicy;
      setRetryPolicy(policy);
      updateRetryPolicyDescriptions(policy);
      updateRetryStimulation(policy);
    }
  }, [retryPolicyId]);

  const updateRetryStimulation = (policy: RetryPolicy | undefined) => {
    const stimulation = policy?.metadata?.retryStimulation || [];
    const retryStimulationRows: RetryStimulationItem[] = stimulation.map(
      (item, i, arr) => {
        const nextRetryIn = item;
        let interval = 0;
        if (i > 0) {
          interval = item - arr[i - 1];
        }
        return {
          attempt: i + 1,
          nextRetryIn,
          interval,
        } as RetryStimulationItem;
      }
    );
    setRetrySimulationItems(retryStimulationRows);
    setRetrySimulationData(
      stimulation.map((value, i) => ({ attempt: i + 1, nextRetry: value }))
    );
  };

  const updateRetryPolicyDescriptions = (policy: RetryPolicy | undefined) => {
    const inputs =
      RetryPolicyOptions[
        policy?.policyType.toString() as keyof RetryPolicyOptionsProps
      ]?.value?.inputs || [];
    setRetryPolicyDescriptions(
      inputs.map((input, i) => ({
        key: i,
        label: input.label,
        children: policy?.[input.value],
        span: Span[2],
      }))
    );
  };

  useEffect(() => {
    fetchRetryPolicy();
  }, [fetchRetryPolicy]);

  const primaryAxis = useMemo<AxisOptions<any>>(
    () => ({
      getValue: (datum) => datum.attempt,
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<any>[]>(
    () => [
      {
        getValue: (datum) => formatTimeShort(datum.nextRetry),
      },
    ],
    []
  );

  return (
    <AppSpace>
      <PageTitle>{retryPolicy?.name}</PageTitle>
      <AppSurface>
        <Descriptions
          column={Span[1]}
          title="Details"
          items={retryPolicyDescriptions}
        />
      </AppSurface>

      {retryStimulationData.length > 0 && (
        <AppSpace>
          <TableTitle>Retry Stimulation Chart</TableTitle>
          <Flex style={{ height: 400 }}>
            <Chart
              options={{
                data: [
                  {
                    data: retryStimulationData,
                    label: "Next Retry",
                  },
                ],
                primaryAxis,
                secondaryAxes,
              }}
            />
          </Flex>
        </AppSpace>
      )}

      <AppTable
        title={() => <TableTitle>Retry Stimulation Table</TableTitle>}
        rowId="attempt"
        rows={retryStimulationItems}
        columns={columns}
      />
    </AppSpace>
  );
};
