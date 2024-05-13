import { Span } from "Config/DataDisplayInterface";
import { WorkStatistic } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
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
            title={
              <Typography.Text className="text-slate-700 font-semibold">
                Works
              </Typography.Text>
            }
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
            title={
              <Typography.Text className="text-slate-700 font-semibold">
                Success
              </Typography.Text>
            }
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
            title={
              <Typography.Text className="text-slate-700 font-semibold">
                In Progress
              </Typography.Text>
            }
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
            title={
              <Typography.Text className="text-slate-700 font-semibold">
                Failure
              </Typography.Text>
            }
            value={statistic?.failures.length}
            formatter={formatter}
            valueStyle={{ ...valueStyle, color: token.colorError }}
          />
        </AppCard>
      </Col>
    </AppRow>
  );
};
