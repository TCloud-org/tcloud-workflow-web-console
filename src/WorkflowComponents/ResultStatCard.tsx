import { Work } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { Statistic, StatisticProps } from "antd";
import { CSSProperties, ReactNode } from "react";
import CountUp from "react-countup";
import { useLocation, useNavigate } from "react-router-dom";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

const valueStyle: CSSProperties = {
  fontWeight: 800,
  padding: "16px 0",
};

export const ResultStatCard = (props: {
  data: {
    type: string;
    title?: string;
    value?: number;
    color?: string;
    data: Work[];
    icon?: ReactNode;
  };
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const { data } = props;

  const handleStatisticClick = (name: string) => {
    navigate(`/statistic?${params}`, {
      state: {
        name: name,
        data: data.data,
      },
    });
  };

  return (
    <AppCard
      onClick={() => handleStatisticClick(data.type)}
      className="cursor-pointer relative z-10 hover:border-neutral-5"
    >
      <Statistic
        title={<StatTitle icon={data.icon}>{data.title}</StatTitle>}
        value={data.value}
        formatter={formatter}
        valueStyle={{
          ...valueStyle,
        }}
        className="z-10"
      />
    </AppCard>
  );
};
