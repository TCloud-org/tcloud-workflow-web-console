import { EditOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Text } from "recharts";
import { Span } from "../../Config/DataDisplayInterface";
import { EditableColumn } from "../../Config/LayoutConfig";
import {
  RetryPolicy,
  RetryPolicyOptions,
  RetryPolicyOptionsProps,
  RetryStimulationItem,
} from "../../Config/RetryConfig";
import { AppAreaChart } from "../../DataDisplayComponents/AppAreaChart";
import { AppDescriptions } from "../../DataDisplayComponents/AppDescriptions";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { AppTable } from "../../DataDisplayComponents/AppTable";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { TableTitle } from "../../DataDisplayComponents/TableTitle";
import { AppIconButton } from "../../DataEntryComponents/AppIconButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getRetryPolicy } from "../../Network/RetryFetch";
import { formatTime, formatTimeShort } from "../../Utils/DateUtils";
import { useSelector } from "react-redux";

const columns: EditableColumn[] = [
  {
    title: "Attempt",
    dataIndex: "attempt",
  },
  {
    title: "Delay",
    dataIndex: "delay",
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
  const location = useLocation();
  const navigate = useNavigate();
  const { retryPolicyId } = useParams();
  const authToken = useSelector((state: any) => state.auth.token);

  const [retryPolicy, setRetryPolicy] = useState<RetryPolicy>();
  const [retryPolicyDescriptions, setRetryPolicyDescriptions] = useState<any[]>(
    []
  );
  const [retryStimulationItems, setRetrySimulationItems] = useState<
    RetryStimulationItem[]
  >([]);
  const [retryStimulationData, setRetrySimulationData] = useState<any[]>([]);
  const [retryStimulationDelays, setRetrySimulationDelays] = useState<any[]>(
    []
  );

  const fetchRetryPolicy = useCallback(async () => {
    if (retryPolicyId) {
      const data = await getRetryPolicy(retryPolicyId, authToken);
      const policy = data?.retryPolicy;
      setRetryPolicy(policy);
      updateRetryPolicyDescriptions(policy);
      updateRetryStimulation(policy);
    }
  }, [retryPolicyId, authToken]);

  const updateRetryStimulation = (policy: RetryPolicy | undefined) => {
    const stimulation = policy?.metadata?.retryStimulation || [];
    const retryStimulationRows: RetryStimulationItem[] = stimulation.map(
      (item, i, arr) => {
        const nextRetryIn = item;
        let delay = 0;
        if (i > 0) {
          delay = item - arr[i - 1];
        }
        return {
          attempt: i + 1,
          nextRetryIn,
          delay,
        } as RetryStimulationItem;
      }
    );
    setRetrySimulationItems(retryStimulationRows);
    setRetrySimulationData(
      stimulation.map((value, i) => ({ name: i + 1, nextRetry: value }))
    );
    setRetrySimulationDelays(
      stimulation.map((value, i) => ({
        name: i + 1,
        delay: i === 0 ? value : Math.abs(value - stimulation[i - 1]),
      }))
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

  const renderYTick = (tick: any): ReactElement<SVGElement> => {
    return (
      <Text x={tick.x} y={tick.y} textAnchor="end">
        {formatTimeShort(tick.payload.value)}
      </Text>
    );
  };

  const handleEdit = () => {
    navigate(`${location.pathname}/edit`, {
      state: {
        data: retryPolicy,
      },
    });
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppIconButton
            onClick={handleEdit}
            tooltip="Edit retry policy"
            type="primary"
          >
            <EditOutlined />
          </AppIconButton>
        }
      >
        {retryPolicy?.name}
      </PageTitle>
      <AppSurface type="form" style={{ paddingBottom: 0 }}>
        <AppDescriptions
          title="Details"
          items={retryPolicyDescriptions}
          layout="vertical"
        />
      </AppSurface>

      <AppSpace>
        <TableTitle>Retry Stimulation Chart</TableTitle>

        <AppSurface type="form">
          <Flex justify="center">
            <AppAreaChart
              data={retryStimulationData}
              yAxisTick={renderYTick}
              dataKey="nextRetry"
              height={300}
              syncId={retryPolicy?.retryPolicyId}
            />
          </Flex>
        </AppSurface>
        <AppSurface type="form">
          <Flex justify="center">
            <AppAreaChart
              data={retryStimulationDelays}
              yAxisTick={renderYTick}
              dataKey="delay"
              yMaxLabel="Max Delay"
              height={300}
              yMax={retryPolicy?.maxDelay}
              syncId={retryPolicy?.retryPolicyId}
            />
          </Flex>
        </AppSurface>
      </AppSpace>

      <AppTable
        rowId="attempt"
        heading="Retry Stimulation Table"
        rows={retryStimulationItems}
        columns={columns}
      />
    </AppSpace>
  );
};
