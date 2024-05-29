import { WorkStatistic } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { Statistic, Typography, theme } from "antd";
import { Fragment } from "react/jsx-runtime";

export const ResultDistributionCard = (props: {
  statistic?: WorkStatistic;
}) => {
  const { token } = theme.useToken();

  const { statistic } = props;

  return (
    <Fragment>
      <AppCard
        size="small"
        className="bg-white relative z-10 mr-2 h-full"
        style={{ borderColor: "transparent" }}
      >
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
                    fill: "#12bc95",
                  },
                  {
                    name: "In Progress",
                    value: statistic?.progresses.length,
                    fill: "#47c9d7",
                  },
                  {
                    name: "Failure",
                    value: statistic?.failures.length,
                    fill: "#f86767",
                  },
                ]}
                width={400}
                height={300}
              />
            )
          }
        />
      </AppCard>
      {/* <div className="absolute left-[20px] mr-2 -right-[8px] top-[16px] -bottom-[16px] bg-blue-500/50 border border-solid border-black rounded-md z-0" /> */}
    </Fragment>
  );
};
