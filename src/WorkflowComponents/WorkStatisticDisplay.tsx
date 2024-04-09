import { WorkStatistic } from "Config/WorkflowConfig";
import { AppPieChart } from "DataDisplayComponents/AppPieChart";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppRow } from "LayoutComponents/AppRow";
import { Card, Col, Statistic, StatisticProps, theme } from "antd";
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

  return (
    <AppSurface>
      <AppRow style={{ rowGap: "16px" }}>
        <Col span={6}>
          <Card bordered={false} size="small">
            <Statistic
              title="Works"
              value={statistic?.totalWorks}
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
              title="Successes"
              value={statistic?.successes.length}
              formatter={formatter}
              valueStyle={{ color: token.colorSuccess }}
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
              title="Progresses"
              value={statistic?.progresses.length}
              formatter={formatter}
              valueStyle={{ color: token.colorWarning }}
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
              title="Failures"
              value={statistic?.failures.length}
              formatter={formatter}
              valueStyle={{ color: token.colorError }}
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
              valueRender={(_) => (
                <AppPieChart
                  data={[
                    {
                      name: "Successes",
                      value: statistic?.successes.length,
                      fill: token.colorSuccess,
                    },
                    {
                      name: "Progresses",
                      value: statistic?.progresses.length,
                      fill: token.colorWarning,
                    },
                    {
                      name: "Failures",
                      value: statistic?.failures.length,
                      fill: token.colorError,
                    },
                  ]}
                  width={400}
                  height={300}
                />
              )}
            />
          </Card>
        </Col>
      </AppRow>
    </AppSurface>
  );
};
