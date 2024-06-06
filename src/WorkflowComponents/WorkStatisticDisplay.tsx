import { Span } from "Config/DataDisplayInterface";
import {
  InfraStatistic,
  StepWorkflowBilling,
  WorkStatistic,
} from "Config/WorkflowConfig";
import { Col, Row } from "antd";
import { BillingCard } from "./BillingCard";
import { InfraCompositionCard } from "./InfraCompositionCard";
import { ResultDistributionCard } from "./ResultDistributionCard";
import { ResultStatSection } from "./ResultStatSection";
import { WorkflowAPIKeyDisplay } from "./WorkflowAPIKeyDisplay";
import { WorkflowTransitionsDisplay } from "./WorkflowTransitionsDisplay";

export const WorkStatisticDisplay = (props: {
  statistic?: WorkStatistic;
  infraStatistic?: InfraStatistic;
  infraStatisticLoading?: boolean;
  billing?: StepWorkflowBilling;
}) => {
  const { statistic, infraStatistic, infraStatisticLoading, billing } = props;

  return (
    <Row gutter={[16, 16]} className="lighting-bg">
      <Col {...Span[2]}>
        <Row gutter={[16, 16]}>
          <Col {...Span[1]}>
            <BillingCard billing={billing} />
          </Col>

          <Col {...Span[1]}>
            <WorkflowTransitionsDisplay />
          </Col>

          <Col {...Span[1]}>
            <WorkflowAPIKeyDisplay />
          </Col>
        </Row>
      </Col>

      <Col {...Span[2]}>
        <Row gutter={[16, 16]}>
          <ResultStatSection statistic={statistic} />

          <Col {...Span[1]} className="flex flex-col">
            <ResultDistributionCard statistic={statistic} />
          </Col>

          <Col {...Span[1]} className="flex flex-col">
            <InfraCompositionCard
              infraStatistic={infraStatistic}
              infraStatisticLoading={infraStatisticLoading}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
