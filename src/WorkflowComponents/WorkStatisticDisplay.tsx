import { WorkStatistic } from "Config/WorkflowConfig";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppRow } from "LayoutComponents/AppRow";
import { Card, Col, Statistic, StatisticProps, theme } from "antd";
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
    <AppSurface>
      <AppRow style={{ rowGap: "16px" }}>
        <Col span={6}>
          <Card bordered={false} size="small">
            <Statistic
              title="Works"
              value={statistic?.totalWorks}
              valueStyle={{ ...valueStyle, color: token.colorPrimary }}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            onClick={() => handleStatisticClick("successes")}
            style={{ cursor: "pointer" }}
            size="small"
          >
            <Statistic
              title="Success"
              value={statistic?.successes.length}
              formatter={formatter}
              valueStyle={{ ...valueStyle, color: token.colorSuccess }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            onClick={() => handleStatisticClick("progresses")}
            style={{ cursor: "pointer" }}
            size="small"
          >
            <Statistic
              title="In Progress"
              value={statistic?.progresses.length}
              formatter={formatter}
              valueStyle={{ ...valueStyle, color: token.colorWarning }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered={false}
            onClick={() => handleStatisticClick("failures")}
            style={{ cursor: "pointer" }}
            size="small"
          >
            <Statistic
              title="Failure"
              value={statistic?.failures.length}
              formatter={formatter}
              valueStyle={{ ...valueStyle, color: token.colorError }}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card bordered={false} size="small">
            <Statistic
              title="Result Distribution Chart"
              valueStyle={{
                fontSize: "14px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
              valueRender={(_) =>
                !statistic || statistic.totalWorks === 0 ? (
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
          </Card>
        </Col>
      </AppRow>
    </AppSurface>
  );
};
