import { Span } from "Config/DataDisplayInterface";
import { WorkStatistic } from "Config/WorkflowConfig";
import { AppBarChart } from "DataDisplayComponents/AppBarChart";
import { AppCard } from "DataDisplayComponents/AppCard";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Statistic, StatisticProps, Typography, theme } from "antd";
import { CSSProperties } from "react";
import CountUp from "react-countup";
import { useLocation, useNavigate } from "react-router-dom";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

export const WorkStatisticDisplay = (props: { statistic?: WorkStatistic }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const { token } = theme.useToken();

  const { statistic } = props;

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
        <AppCard size="small">
          <Statistic
            title={<StatTitle>Works</StatTitle>}
            value={statistic?.totalWorks}
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
            title={<StatTitle>Infra Composition Chart</StatTitle>}
            valueStyle={{
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            valueRender={() => (
              <AppBarChart
                className="mr-12"
                width={350}
                height={300}
                data={[
                  {
                    name: "Workflow",
                    value: 2,
                  },
                  { name: "Graph", value: 10 },
                  {
                    name: "Service",
                    value: 5,
                  },
                  {
                    name: "Retry Policy",
                    value: 3,
                  },
                ]}
              />
            )}
          />
        </AppCard>
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <AppCard size="small" className="h-full">
          <Statistic
            title={<StatTitle>Billing</StatTitle>}
            valueStyle={{
              fontSize: "14px",
            }}
            valueRender={() => <Typography.Text>$0.00</Typography.Text>}
          />
        </AppCard>
      </Col>
    </AppRow>
  );
};
