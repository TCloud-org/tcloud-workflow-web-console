import { WorkStatistic } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { Statistic, Typography, theme } from "antd";

export const ResultDistributionCard = (props: {
  statistic?: WorkStatistic;
}) => {
  const { token } = theme.useToken();

  const { statistic } = props;

  return (
    <AppCard size="small" bordered={false} style={{ boxShadow: "none" }}>
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
  );
};
