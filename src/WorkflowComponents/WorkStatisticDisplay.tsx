import {
  BrokenImageRounded,
  EmojiEventsRounded,
  EngineeringRounded,
  ListAltRounded,
} from "@mui/icons-material";
import { Span } from "Config/DataDisplayInterface";
import {
  InfraStatistic,
  StepWorkflowBilling,
  WorkStatistic,
} from "Config/WorkflowConfig";
import { AppBarChart } from "DataDisplayComponents/AppBarChart";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Flex, Progress, Statistic, Typography, theme } from "antd";
import { BillingCard } from "./BillingCard";
import { ResultStatCard } from "./ResultStatCard";
import { AppButton } from "DataEntryComponents/AppButton";

export const WorkStatisticDisplay = (props: {
  statistic?: WorkStatistic;
  infraStatistic?: InfraStatistic;
  infraStatisticLoading?: boolean;
  billing?: StepWorkflowBilling;
}) => {
  const { token } = theme.useToken();

  const { statistic, infraStatistic, infraStatisticLoading, billing } = props;

  const stats = [
    {
      data: statistic?.works || [],
      type: "works",
      color: token.colorPrimary,
      value: statistic?.works.length || 0,
      title: "Works",
      icon: <ListAltRounded />,
    },
    {
      data: statistic?.successes || [],
      type: "successes",
      color: token.colorSuccess,
      value: statistic?.successes.length || 0,
      title: "Success",
      icon: <EmojiEventsRounded />,
    },
    {
      data: statistic?.progresses || [],
      type: "progresses",
      color: token.colorWarning,
      value: statistic?.progresses.length || 0,
      title: "In Progress",
      icon: <EngineeringRounded />,
    },
    {
      data: statistic?.failures || [],
      type: "failures",
      color: token.colorError,
      value: statistic?.failures.length || 0,
      title: "Failure",
      icon: <BrokenImageRounded />,
    },
  ];

  return (
    <AppRow gutter={[16, 16]}>
      <Col {...Span[2]} className="flex flex-col">
        <AppRow gutter={[16, 16]} style={{ height: "100%" }}>
          {stats.map((stat, i) => (
            <Col key={i} {...Span[2]} className="flex flex-col">
              <ResultStatCard data={stat} />
            </Col>
          ))}
        </AppRow>
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <AppRow gutter={[16, 16]}>
          {billing && (
            <Col {...Span[1]}>
              <AppCard size="small">
                <Statistic
                  title={<StatTitle>Free Tier</StatTitle>}
                  valueRender={() => (
                    <Flex vertical gap={4}>
                      <Flex justify="flex-end">
                        <Typography.Text className="text-slate-800">
                          {billing.totalTransitions} /{" "}
                          {billing.deductibleTransitions}
                        </Typography.Text>
                      </Flex>
                      <Progress
                        type="line"
                        showInfo={false}
                        percent={
                          billing.totalTransitions /
                          billing.deductibleTransitions
                        }
                        strokeColor={token.colorInfo}
                      />
                      <Flex className="mt-4">
                        <AppButton type="primary" size="small">
                          Upgrade plan
                        </AppButton>
                      </Flex>
                    </Flex>
                  )}
                />
              </AppCard>
            </Col>
          )}
          <Col {...Span[1]}>
            <BillingCard billing={billing} />
          </Col>
        </AppRow>
      </Col>

      <Col {...Span[2]} className="flex flex-col">
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
              !statistic || statistic.works.length === 0 ? (
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

      <Col {...Span[2]} className="flex flex-col">
        <AppCard size="small" className="h-full">
          <Statistic
            loading={infraStatisticLoading}
            title={<StatTitle>Infra Composition Chart</StatTitle>}
            valueStyle={{
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            valueRender={() => (
              <AppBarChart
                className="mr-12 mt-4"
                width={350}
                height={300}
                data={[
                  {
                    name: "Workflow",
                    value: infraStatistic?.totalWorkflows || 0,
                  },
                  { name: "Graph", value: infraStatistic?.totalGraphs || 0 },
                  {
                    name: "Service",
                    value: infraStatistic?.totalServices || 0,
                  },
                  {
                    name: "Retry Policy",
                    value: infraStatistic?.totalRetryPolicies || 0,
                  },
                ]}
              />
            )}
          />
        </AppCard>
      </Col>
    </AppRow>
  );
};
