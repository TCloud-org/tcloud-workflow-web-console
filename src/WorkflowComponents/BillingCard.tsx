import { StepWorkflowBilling } from "Config/WorkflowConfig";
import { AppBarChart } from "DataDisplayComponents/AppBarChart";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import {
  prettifyDateWithoutDay,
  prettifyDateWithoutYear,
} from "Utils/DateUtils";
import { formatTitleCase } from "Utils/ObjectUtils";
import { Flex, Statistic, Typography } from "antd";
import { Account, ProductTierType, ProductType } from "features/auth/authSlice";
import { useSelector } from "react-redux";

export const BillingCard = (props: { billing?: StepWorkflowBilling }) => {
  const { billing } = props;
  const account: Account = useSelector((state: any) => state.auth.account);
  const tier =
    account.productTiers?.find(
      (item) => item.product === ProductType.STEP_WORKFLOW
    )?.tier || ProductTierType.LITE;

  return (
    <Statistic
      title={
        <Flex align="center" justify="space-between">
          <StatTitle>Billing</StatTitle>
          <StatTitle>
            {prettifyDateWithoutDay(
              billing?.startDate || new Date().getTime().toString()
            )}
          </StatTitle>
        </Flex>
      }
      valueStyle={{
        fontSize: 14,
      }}
      valueRender={() =>
        billing ? (
          <Flex vertical gap={8} className="mt-2">
            <Typography.Text>${billing.cost.toFixed(2)}</Typography.Text>
            <Typography.Text>
              Current plan: {formatTitleCase(tier)}
            </Typography.Text>
            <Typography.Text>
              Total transitions: {billing.totalTransitions}
            </Typography.Text>

            <div className="flex justify-center">
              <AppBarChart
                className="mt-8"
                width={300}
                height={300}
                data={[
                  {
                    name: prettifyDateWithoutYear(billing.startDate),
                    "Step workflow": billing.cost,
                  },
                ]}
              />
            </div>
          </Flex>
        ) : (
          <AppEmpty />
        )
      }
    />
  );
};
