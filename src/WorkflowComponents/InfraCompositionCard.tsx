import { InfraStatistic } from "Config/WorkflowConfig";
import { AppBarChart } from "DataDisplayComponents/AppBarChart";
import { AppCard } from "DataDisplayComponents/AppCard";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { Statistic } from "antd";
import { Fragment } from "react/jsx-runtime";

export const InfraCompositionCard = (props: {
  infraStatistic?: InfraStatistic;
  infraStatisticLoading?: boolean;
}) => {
  const { infraStatistic, infraStatisticLoading } = props;

  return (
    <Fragment>
      <AppCard
        size="small"
        className="bg-white relative z-10 mr-2"
        style={{ borderColor: "black" }}
      >
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
      <div className="absolute left-[20px] mr-2 -right-[8px] top-[16px] -bottom-[16px] bg-blue-500/50 border border-solid border-black rounded-md z-0" />
    </Fragment>
  );
};
