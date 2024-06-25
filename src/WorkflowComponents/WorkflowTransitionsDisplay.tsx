import { StepWorkflowBilling } from "Config/WorkflowConfig";
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
    )?.tier || ProductTierType.LITE;

  const { billing } = props;

  const handleUpgradePlan = () => {
    navigate("/subscription/plan");
  };

  return (
    <Statistic
      title={<StatTitle>Lite</StatTitle>}
      valueRender={() => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
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
          </div>

          {tier !== ProductTierType.ENTERPRISE && (
            <Flex>
              <AppButton type="primary" onClick={handleUpgradePlan}>
                Upgrade plan
              </AppButton>
            </Flex>
          )}
        </div>
      )}
    />
  );
};
