import { ProfileFilled, RocketFilled, SettingFilled } from "@ant-design/icons";
import { AppNextActionCard } from "DataDisplayComponents/AppNextActionCard";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Col, Divider, Flex, Typography } from "antd";

const nextSteps = [
  {
    title: "How It Works",
    description: "Interested? Learn more about how it works",
    icon: <SettingFilled />,
    href: "/api-workflow-how-it-works",
  },
  {
    title: "Quickstart",
    description: "Follow our quickstart tutorial to build a sample workflow",
    icon: <RocketFilled />,
    href: "/api-workflow-quickstart",
  },
  {
    title: "Onboarding",
    description:
      "Feel ready? Head over to our onboarding process to get started",
    icon: <ProfileFilled />,
    href: "/api-workflow-onboarding",
  },
];

export const ApiWorkflowIntroductionPage = () => {
  return (
    <AppSpace>
      <PageTitle>Introduction</PageTitle>

      <Typography.Title level={3}>Overview</Typography.Title>
      <Typography.Paragraph>
        Our API Workflow Integration Platform offers a seamless solution for
        clients seeking to optimize their API workflow processes. By integrating
        with our platform, clients can streamline their operations, enhance
        efficiency, and achieve greater productivity in managing their API
        interactions.
      </Typography.Paragraph>

      <Typography.Title level={3}>Key Features</Typography.Title>

      <Typography.Title level={4}>Integration</Typography.Title>
      <Typography.Paragraph>
        Clients can easily onboard and integrate their systems with minimal
        coding effort, accelerating time to value and reducing implementation
        barriers. Our user-friendly interface and comprehensive documentation
        guide clients through the integration process, ensuring a smooth and
        hassle-free experience.
      </Typography.Paragraph>

      <Typography.Title level={4}>Configuration</Typography.Title>
      <Typography.Paragraph>
        Clients have the flexibility to customize their workflow configurations
        based on their specific requirements. They can define workflows tailored
        to their unique business needs, incorporating different API
        interactions, and automation rules.
      </Typography.Paragraph>

      <Typography.Title level={4}>Monitoring</Typography.Title>
      <Typography.Paragraph>
        Our platform offers comprehensive monitoring and analytics capabilities,
        providing clients with insights into their API workflow performance.
        Clients can track API usage, monitor response times, identify
        bottlenecks, and optimize workflows for enhanced efficiency.
      </Typography.Paragraph>

      <Typography.Title level={4}>Security</Typography.Title>
      <Typography.Paragraph>
        Security is paramount in API interactions. Our platform ensures robust
        security measures, including authentication, authorization, encryption,
        and compliance with industry standards and regulations. Clients can
        trust that their data is secure and compliant with relevant
        requirements.
      </Typography.Paragraph>

      <Divider />

      <Flex align="center" vertical gap={32} style={{ marginBottom: "32px" }}>
        <Typography.Title level={5}>Next Steps</Typography.Title>
        <AppRow
          gutter={[16, 16]}
          style={{ width: "100%", justifyContent: "center" }}
        >
          {nextSteps.map((step, i) => (
            <Col span={8} key={i}>
              <AppNextActionCard {...step} />
            </Col>
          ))}
        </AppRow>
      </Flex>
    </AppSpace>
  );
};
