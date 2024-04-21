import {
  ApartmentOutlined,
  ApiOutlined,
  InteractionOutlined,
  KeyOutlined,
  MonitorOutlined,
  ProfileFilled,
  RocketFilled,
} from "@ant-design/icons";
import {
  AppDisplayStep,
  AppDisplayStepProps,
} from "DataDisplayComponents/AppDisplayStep";
import { AppNextActionCard } from "DataDisplayComponents/AppNextActionCard";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Col, Divider, Flex, Typography, theme } from "antd";
import { Fragment } from "react/jsx-runtime";

const nextSteps = [
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

const steps: AppDisplayStepProps[] = [
  {
    icon: <InteractionOutlined />,
    description:
      "Wrap your API request and response model with our Document model",
  },
  {
    icon: <ApartmentOutlined />,
    description:
      "Configure your service endpoints, retry strategies, and workflow",
  },
  {
    icon: <KeyOutlined />,
    description: "Add your service authentication token",
  },
  {
    icon: <ApiOutlined />,
    description: "Integrate with our API to trigger your workflow",
  },
  {
    icon: <MonitorOutlined />,
    description: "Monitor your workflow until it succeeds",
  },
];
export const ApiWorkflowHowItWorksPage = () => {
  const { token } = theme.useToken();

  return (
    <AppSpace>
      <PageTitle>How Does It Works?</PageTitle>
      <Typography.Title level={3}>What's alias?</Typography.Title>
      <Typography.Paragraph>
        Using an <strong>"alias"</strong> provides a clear, human-readable
        reference to a specific version. Instead of manually typing version
        numbers, which could lead to errors, an alias simplifies the process by
        indicating which version of the workflow to execute.{" "}
        <em>
          It's important to note that all operations will be executed based on
          the version associated with the <strong>live</strong> alias by
          default.
        </em>
      </Typography.Paragraph>

      <Typography.Title level={3}>Process</Typography.Title>
      <Typography.Paragraph>
        {
          "Explore our streamlined 5-step process to initiate your first workflow. To learn more details about each step, check out the "
        }
        <a href="/api-workflow-quickstart">Quickstart</a>
        {" tutorial."}
      </Typography.Paragraph>
      {steps.map((step, i) => (
        <Fragment key={i}>
          {i !== 0 && (
            <Flex justify="center">
              <Divider
                type="vertical"
                style={{
                  height: "100px",
                  borderColor: token.colorBorder,
                }}
                dashed
              />
            </Flex>
          )}
          <AppDisplayStep {...step} step={i + 1} />
        </Fragment>
      ))}

      <Divider />

      <Flex align="center" vertical gap={32}>
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
