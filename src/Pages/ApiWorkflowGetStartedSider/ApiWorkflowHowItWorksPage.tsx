import {
  ApartmentOutlined,
  ApiOutlined,
  InteractionOutlined,
  KeyOutlined,
  MonitorOutlined,
} from "@ant-design/icons";
import {
  AppDisplayStep,
  AppDisplayStepProps,
} from "DataDisplayComponents/AppDisplayStep";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Divider, Flex, Typography, theme } from "antd";
import { Fragment } from "react/jsx-runtime";

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
    </AppSpace>
  );
};
