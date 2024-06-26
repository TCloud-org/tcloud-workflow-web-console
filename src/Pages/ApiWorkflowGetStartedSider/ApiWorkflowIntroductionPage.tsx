import { ProfileFilled, RocketFilled, SettingFilled } from "@ant-design/icons";
import {
  AppHeadingLink,
  scrollToHash,
} from "DataDisplayComponents/AppHeadingLink";
import { AppNextActionCard } from "DataDisplayComponents/AppNextActionCard";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Col, Divider, Flex, Typography } from "antd";
import { useEffect } from "react";

const nextSteps = [
  {
    title: "How It Works",
    description: "Interested? Learn more about how it works",
    icon: <SettingFilled />,
    href: "/step-workflow-how-it-works",
  },
  {
    title: "Quickstart",
    description: "Follow our quickstart tutorial to build a sample workflow",
    icon: <RocketFilled />,
    href: "/step-workflow-quickstart",
  },
  {
    title: "Onboarding",
    description:
      "Feel ready? Head over to our onboarding process to get started",
    icon: <ProfileFilled />,
    href: "/step-workflow-onboarding",
  },
];

export const ApiWorkflowIntroductionPage = () => {
  useEffect(() => {
    scrollToHash();
  }, []);

  return (
    <AppSpace>
      <PageTitle>Introduction</PageTitle>

      <AppHeadingLink level={3}>Overview</AppHeadingLink>
      <Typography.Paragraph>
        Our Step Workflow Integration Platform offers a seamless solution for
        clients seeking to optimize their Step Workflow processes. By
        integrating with our platform, clients can streamline their operations,
        enhance efficiency, and achieve greater productivity in managing their
        API interactions.
      </Typography.Paragraph>

      <AppHeadingLink level={3}>Key Features</AppHeadingLink>

      <AppHeadingLink level={4}>Integration</AppHeadingLink>
      <Typography.Paragraph>
        Clients can easily onboard and integrate their systems with minimal
        coding effort, accelerating time to value and reducing implementation
        barriers. Our user-friendly interface and comprehensive documentation
        guide clients through the integration process, ensuring a smooth and
        hassle-free experience.
      </Typography.Paragraph>

      <AppHeadingLink level={4}>Configuration</AppHeadingLink>
      <Typography.Paragraph>
        Clients have the flexibility to customize their workflow configurations
        based on their specific requirements. They can define workflows tailored
        to their unique business needs, incorporating different API
        interactions, and automation rules.
      </Typography.Paragraph>

      <AppHeadingLink level={4}>Monitoring</AppHeadingLink>
      <Typography.Paragraph>
        Our platform offers comprehensive monitoring and analytics capabilities,
        providing clients with insights into their Step Workflow performance.
        Clients can track API usage, monitor response times, identify
        bottlenecks, and optimize workflows for enhanced efficiency.
      </Typography.Paragraph>

      <AppHeadingLink level={4}>Security</AppHeadingLink>
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
