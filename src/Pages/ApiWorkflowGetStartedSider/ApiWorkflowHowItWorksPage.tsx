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
    icon: <KeyOutlined />,
    description: "Add your service authentication token",
  },
  {
    icon: <ApartmentOutlined />,
    description:
      "Configure your workflow, service endpoints, and retry strategies",
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
      <Typography.Paragraph>
        {
          "Our process takes 5 steps. To learn more details about each step, check out the "
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
