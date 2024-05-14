import { StepWorkflowBilling } from "Config/WorkflowConfig";
import { AppBarChart } from "DataDisplayComponents/AppBarChart";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import {
  prettifyDateWithoutDay,
  prettifyDateWithoutYear,
} from "Utils/DateUtils";
import { Flex, Statistic, Typography } from "antd";

export const BillingCard = (props: { billing?: StepWorkflowBilling }) => {
  const { billing } = props;

  return (
    <AppCard size="small" className="h-full">
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
            <Flex gap={8} className="mt-2">
              <Flex vertical flex={1} gap={8}>
                <Typography.Text>${billing.cost.toFixed(2)}</Typography.Text>
              </Flex>

              <Flex flex={1}>
                <AppBarChart
                  width={240}
                  height={300}
                  data={[
                    {
                      name: prettifyDateWithoutYear(billing.startDate),
                      "Step workflow": billing.cost,
                    },
                  ]}
                />
              </Flex>
            </Flex>
          ) : (
            <AppEmpty />
          )
        }
      />
    </AppCard>
  );
};
