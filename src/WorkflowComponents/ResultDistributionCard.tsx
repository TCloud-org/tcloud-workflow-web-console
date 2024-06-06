import { WorkStatistic } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { Statistic, theme } from "antd";

export const ResultDistributionCard = (props: {
  statistic?: WorkStatistic;
}) => {
  const { token } = theme.useToken();
  const { statistic } = props;

  return (
    <AppCard>
      <Statistic
        title={<StatTitle>Result Distribution Chart</StatTitle>}
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
                  name: "Running",
                  value: statistic?.progresses.length,
                  fill: token.colorInfo,
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
  );
};
