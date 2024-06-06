import { StepWorkflowBilling } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { Flex, Progress, Statistic, Typography, theme } from "antd";
import { Account, ProductTierType, ProductType } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const WorkflowTransitionsDisplay = (props: {
  billing?: StepWorkflowBilling;
}) => {
  const navigate = useNavigate();

  const { token } = theme.useToken();
  const account: Account = useSelector((state: any) => state.auth.account);
  const tier =
    account.productTiers?.find(
      (item) => item.product === ProductType.STEP_WORKFLOW
    )?.tier || ProductTierType.FREE_TIER;

  const { billing } = props;

  const handleUpgradePlan = () => {
    navigate("/subscription/plan");
  };

  return (
    <AppCard>
      <Statistic
        title={<StatTitle>Lite</StatTitle>}
        valueRender={() => (
          <Flex vertical gap={4} className="mt-4">
            <Flex justify="space-between" align="center">
              <Typography.Text>Transitions</Typography.Text>
              <Typography.Text>
                {billing?.totalTransitions || 0} /{" "}
                {billing?.deductibleTransitions || 0}
              </Typography.Text>
            </Flex>
            <Progress
              type="line"
              showInfo={false}
              percent={
                billing
                  ? billing.totalTransitions / billing.deductibleTransitions
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
  );
};
