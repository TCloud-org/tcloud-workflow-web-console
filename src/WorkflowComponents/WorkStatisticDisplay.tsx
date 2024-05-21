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
import { AppSecretDescription } from "DataDisplayComponents/AppSecretDescription";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import {
  Col,
  Divider,
  Flex,
  Progress,
  Statistic,
  Typography,
  theme,
} from "antd";
import { Account, ProductTierType, ProductType } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BillingCard } from "./BillingCard";
import { ResultStatSection } from "./ResultStatSection";
import { ResultDistributionCard } from "./ResultDistributionCard";
import { InfraCompositionCard } from "./InfraCompositionCard";
import { AppRow } from "LayoutComponents/AppRow";

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

  const handleUpgradePlan = () => {
    navigate("/subscription/plan");
  };

  return (
    <Flex vertical>
      <ResultStatSection statistic={statistic} />

      <Divider />

      <AppRow gutter={[16, 16]} className="px-4">
        <Col {...Span[2]} className="flex flex-col">
          <ResultDistributionCard statistic={statistic} />
        </Col>

        <Col {...Span[2]} className="flex flex-col">
          <InfraCompositionCard
            infraStatistic={infraStatistic}
            infraStatisticLoading={infraStatisticLoading}
          />
        </Col>
      </AppRow>

      <Divider />

      <AppRow gutter={[16, 16]} className="px-4">
        <Col {...Span[2]}>
          <AppCard size="small" bordered={false} style={{ boxShadow: "none" }}>
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
        <Col {...Span[2]}>
          <AppCard size="small" bordered={false} style={{ boxShadow: "none" }}>
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
      </AppRow>

      <Divider />

      <div className="px-4">
        <BillingCard billing={billing} />
      </div>

      <Divider />
    </Flex>
  );
};
