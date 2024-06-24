import {
  CachedRounded,
  CheckRounded,
  CloseRounded,
  ListAltRounded,
} from "@mui/icons-material";
import { Span } from "Config/DataDisplayInterface";
import { WorkStatistic } from "Config/WorkflowConfig";
import { Col } from "antd";
import { ResultStatCard } from "./ResultStatCard";

export const ResultStatSection = (props: { statistic?: WorkStatistic }) => {
  const { statistic } = props;

  const stats = [
    {
      data: statistic?.works || [],
      type: "works",
      color: "#6147db",
      value: statistic?.works.length || 0,
      title: "All",
      icon: <ListAltRounded />,
    },
    {
      data: statistic?.successes || [],
      type: "successes",
      color: "#12bc95",
      value: statistic?.successes.length || 0,
      title: "Succeeded",
      icon: <CheckRounded />,
    },
    {
      data: statistic?.progresses || [],
      type: "progresses",
      color: "#47c9d7",
      value: statistic?.progresses.length || 0,
      title: "In Progress",
      icon: <CachedRounded />,
    },
    {
      data: statistic?.failures || [],
      type: "failures",
      color: "#f86767",
      value: statistic?.failures.length || 0,
      title: "Failed",
      icon: <CloseRounded />,
    },
  ];

  return (
    <>
      {stats.map((stat, i) => (
        <Col key={i} {...Span[4]}>
          <ResultStatCard data={stat} />
        </Col>
      ))}
    </>
  );
};
