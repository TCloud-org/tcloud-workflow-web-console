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
import { AppButton } from "DataEntryComponents/AppButton";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Flex, Progress, Statistic, Typography, theme } from "antd";
import { Account, ProductTierType, ProductType } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BillingCard } from "./BillingCard";
import { ResultStatCard } from "./ResultStatCard";
import { AppSecretText } from "DataDisplayComponents/AppSecretText";
import { AppSecretDescription } from "DataDisplayComponents/AppSecretDescription";

export const WorkStatisticDisplay = (props: {
  statistic?: WorkStatistic;
  infraStatistic?: InfraStatistic;
  infraStatisticLoading?: boolean;
  billing?: StepWorkflowBilling;
}) => {
  const navigate = useNavigate();
  const account: Account = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);
  const tier =
    account.productTiers?.find(
      (item) => item.product === ProductType.STEP_WORKFLOW
    )?.tier || ProductTierType.FREE_TIER;
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

  const handleUpgradePlan = () => {
    navigate("/subscription/plan");
  };

  return (
    <AppRow gutter={[16, 16]}>
      <Col {...Span[2]} className="flex flex-col">
        <AppRow gutter={[16, 16]}>
          {stats.map((stat, i) => (
            <Col key={i} {...Span[2]}>
              <ResultStatCard data={stat} />
            </Col>
          ))}

          <Col {...Span[1]} className="flex flex-col">
            <AppCard size="small">
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
                      width={400}
                      height={300}
                    />
                  )
                }
              />
            </AppCard>
          </Col>

          <Col {...Span[1]} className="flex flex-col">
            <AppCard size="small">
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
                      {
                        name: "Graph",
                        value: infraStatistic?.totalGraphs || 0,
                      },
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
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <AppRow gutter={[16, 16]}>
          <Col {...Span[1]}>
            <AppCard size="small">
              <Statistic
                title={<StatTitle>API Key</StatTitle>}
                valueStyle={{
                  paddingTop: "8px",
                }}
                valueRender={() => (
                  <Flex vertical>
                    <AppSecretDescription>{authToken}</AppSecretDescription>
                  </Flex>
                )}
              />
            </AppCard>
          </Col>
          <Col {...Span[1]}>
            <AppCard size="small">
              <Statistic
                title={<StatTitle>Free Tier</StatTitle>}
                valueRender={() => (
                  <Flex vertical gap={4} className="mt-4">
                    <Flex justify="space-between" align="center">
                      <Typography.Text>Transitions</Typography.Text>
                      <Typography.Text className="text-slate-800">
                        {billing?.totalTransitions || 0} /{" "}
                        {billing?.deductibleTransitions || 0}
                      </Typography.Text>
                    </Flex>
                    <Progress
                      type="line"
                      showInfo={false}
                      percent={
                        billing
                          ? billing.totalTransitions /
                            billing.deductibleTransitions
                          : 0
                      }
                      strokeColor={token.colorInfo}
                    />
                    {tier !== ProductTierType.ENTERPRISE && (
                      <Flex className="mt-4">
                        <AppButton
                          type="primary"
                          size="small"
                          onClick={handleUpgradePlan}
                        >
                          Upgrade plan
                        </AppButton>
                      </Flex>
                    )}
                  </Flex>
                )}
              />
            </AppCard>
          </Col>
          <Col {...Span[1]}>
            <BillingCard billing={billing} />
          </Col>
        </AppRow>
      </Col>
    </AppRow>
  );
};
