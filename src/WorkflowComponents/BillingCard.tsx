import { StepWorkflowBilling } from "Config/WorkflowConfig";
import { AppBarChart } from "DataDisplayComponents/AppBarChart";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { prettifyDateWithoutYear } from "Utils/DateUtils";
import { Flex, Statistic, Typography } from "antd";

export const BillingCard = (props: { billing?: StepWorkflowBilling }) => {
  const { billing } = props;

  return (
    <AppCard size="small" className="h-full">
      <Statistic
        title={<StatTitle>Billing</StatTitle>}
        valueStyle={{
          fontSize: 14,
        }}
        valueRender={() =>
          billing ? (
            <Flex vertical gap={8}>
              <Typography.Text>${billing.cost.toFixed(2)}</Typography.Text>

              <AppBarChart
                width={240}
                height={300}
                data={[
                  {
                    name: prettifyDateWithoutYear(billing.startDate),
                    value: billing.cost,
                  },
                ]}
              />
            </Flex>
          ) : (
            <AppEmpty />
          )
        }
      />
    </AppCard>
  );
};
