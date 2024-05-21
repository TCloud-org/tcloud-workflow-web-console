import { AppRow } from "LayoutComponents/AppRow";
import { Col, theme } from "antd";
import { ResultStatCard } from "./ResultStatCard";
import { WorkStatistic } from "Config/WorkflowConfig";
import {
  BrokenImageRounded,
  EmojiEventsRounded,
  EngineeringRounded,
  ListAltRounded,
} from "@mui/icons-material";
import { Span } from "Config/DataDisplayInterface";

export const ResultStatSection = (props: { statistic?: WorkStatistic }) => {
  const { token } = theme.useToken();

  const { statistic } = props;

  const stats = [
    {
      data: statistic?.works || [],
      type: "works",
      color: token.colorPrimary,
      value: statistic?.works.length || 0,
      title: "All",
      icon: <ListAltRounded />,
    },
    {
      data: statistic?.successes || [],
      type: "successes",
      color: token.colorSuccess,
      value: statistic?.successes.length || 0,
      title: "Succeeded",
      icon: <EmojiEventsRounded />,
    },
    {
      data: statistic?.progresses || [],
      type: "progresses",
      color: token.colorWarning,
      value: statistic?.progresses.length || 0,
      title: "Running",
      icon: <EngineeringRounded />,
    },
    {
      data: statistic?.failures || [],
      type: "failures",
      color: token.colorError,
      value: statistic?.failures.length || 0,
      title: "Failed",
      icon: <BrokenImageRounded />,
    },
  ];

  return (
    <AppRow gutter={[16, 16]} className="px-4">
      {stats.map((stat, i) => (
        <Col key={i} {...Span[4]}>
          <ResultStatCard data={stat} />
        </Col>
      ))}
    </AppRow>
  );
};
