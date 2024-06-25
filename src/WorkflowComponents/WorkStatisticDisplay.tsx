import { Span } from "Config/DataDisplayInterface";
import {
  InfraStatistic,
  StepWorkflowBilling,
  WorkStatistic,
} from "Config/WorkflowConfig";
import { Col, Divider, Row } from "antd";
import { BillingCard } from "./BillingCard";
import { InfraCompositionCard } from "./InfraCompositionCard";
import { ResultDistributionCard } from "./ResultDistributionCard";
import { ResultStatSection } from "./ResultStatSection";
import { WorkflowAPIKeyDisplay } from "./WorkflowAPIKeyDisplay";
import { WorkflowTransitionsDisplay } from "./WorkflowTransitionsDisplay";
import { ResourceHierarchy } from "./ResourceHierarchy";
import { OnboardingGuide } from "./OnboardingGuide";

export const WorkStatisticDisplay = (props: {
  statistic?: WorkStatistic;
  infraStatistic?: InfraStatistic;
  infraStatisticLoading?: boolean;
  billing?: StepWorkflowBilling;
}) => {
  const { statistic, infraStatistic, infraStatisticLoading, billing } = props;

  return (
    <Row gutter={[64, 16]}>
      <Col {...Span[1]}>
        <Row gutter={[16, 16]}>
          <ResultStatSection statistic={statistic} />
        </Row>
      </Col>

      <Col {...Span[1]}>
        <Divider />
      </Col>

      <Col {...Span[2]}>
        <OnboardingGuide />
      </Col>

      <Col {...Span[2]}>
        <Row gutter={[16, 16]}>
          <Col {...Span[1]}>
            <WorkflowTransitionsDisplay />
          </Col>

          <Col {...Span[1]}>
            <Divider />
          </Col>

          <Col {...Span[1]}>
            <BillingCard billing={billing} />
          </Col>
        </Row>
      </Col>

      <Col {...Span[1]}>
        <Divider />
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <ResultDistributionCard statistic={statistic} />
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <InfraCompositionCard
          infraStatistic={infraStatistic}
          infraStatisticLoading={infraStatisticLoading}
        />
      </Col>

      <Col {...Span[1]}>
        <Divider />
      </Col>

      <Col {...Span[2]}>
        <WorkflowAPIKeyDisplay />
      </Col>

      <Col {...Span[2]} className="flex flex-col">
        <ResourceHierarchy />
      </Col>

      <Col {...Span[1]}>
        <Divider />
      </Col>
    </Row>
  );
};
