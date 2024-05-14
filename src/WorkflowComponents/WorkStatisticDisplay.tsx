import { Span } from "Config/DataDisplayInterface";
import { InfraStatistic, WorkStatistic } from "Config/WorkflowConfig";
import { AppBarChart } from "DataDisplayComponents/AppBarChart";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Statistic, StatisticProps, Typography, theme } from "antd";
import { CSSProperties } from "react";
import CountUp from "react-countup";
import { useLocation, useNavigate } from "react-router-dom";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

export const WorkStatisticDisplay = (props: {
  statistic?: WorkStatistic;
  infraStatistic?: InfraStatistic;
  infraStatisticLoading?: boolean;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const { token } = theme.useToken();

  const { statistic, infraStatistic, infraStatisticLoading } = props;

  const handleStatisticClick = (name: string) => {
    navigate(`/statistic?${params}`, {
      state: {
        name: name,
        data: statistic?.[name as keyof WorkStatistic],
      },
    });
  };

  const valueStyle: CSSProperties = {
    fontWeight: 800,
  };

  return (
    <AppRow gutter={[16, 16]}>
      <Col {...Span[4]}>
        <AppCard
          size="small"
          onClick={() => handleStatisticClick("works")}
          style={{ cursor: "pointer" }}
        >
          <Statistic
            title={<StatTitle>Works</StatTitle>}
            value={statistic?.works.length}
            valueStyle={{ ...valueStyle, color: token.colorPrimary }}
            formatter={formatter}
          />
        </AppCard>
      </Col>
      <Col {...Span[4]}>
        <AppCard
          onClick={() => handleStatisticClick("successes")}
          style={{ cursor: "pointer" }}
          size="small"
        >
          <Statistic
            title={<StatTitle>Success</StatTitle>}
            value={statistic?.successes.length}
            formatter={formatter}
            valueStyle={{ ...valueStyle, color: token.colorSuccess }}
          />
        </AppCard>
      </Col>
      <Col {...Span[4]}>
        <AppCard
          onClick={() => handleStatisticClick("progresses")}
          style={{ cursor: "pointer" }}
          size="small"
        >
          <Statistic
            title={<StatTitle>In Progress</StatTitle>}
            value={statistic?.progresses.length}
            formatter={formatter}
            valueStyle={{ ...valueStyle, color: token.colorWarning }}
          />
        </AppCard>
      </Col>
      <Col {...Span[4]}>
        <AppCard
          onClick={() => handleStatisticClick("failures")}
          style={{ cursor: "pointer" }}
          size="small"
        >
          <Statistic
            title={<StatTitle>Failure</StatTitle>}
            value={statistic?.failures.length}
            formatter={formatter}
            valueStyle={{ ...valueStyle, color: token.colorError }}
          />
        </AppCard>
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <AppCard size="small" className="h-full">
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
                  width={350}
                  height={300}
                />
              )
            }
          />
        </AppCard>
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <AppCard size="small" className="h-full">
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
                  { name: "Graph", value: infraStatistic?.totalGraphs || 0 },
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
      </Col>
    </AppRow>
  );
};
