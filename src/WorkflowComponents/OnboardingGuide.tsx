import { ArrowRightAltRounded } from "@mui/icons-material";
import { AppCard } from "DataDisplayComponents/AppCard";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { Steps } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import { useState } from "react";

const steps = [
  {
    title: "Set up a client",
    href: "/people/add-client",
  },
  {
    title: "Create a workflow",
    href: "/step-workflow/add-workflow",
  },
  {
    title: "Create a retry policy (Optional)",
    href: "/step-workflow/add-retry-policy",
  },
  {
    title: "Add a graph to a workflow",
    href: "/step-workflow/add-graph",
  },
  {
    title: "Prepare your APIs",
    href: "/",
  },
  {
    title: "Link your service endpoints",
    href: "/step-workflow/add-service-endpoint",
  },
  {
    title: "Authorize your service endpoints",
    href: "/authentication/add",
  },
  {
    title: "Initiate the workflow",
    href: "/",
  },
];

export const OnboardingGuide = () => {
  const [current, setCurrent] = useState<number>(0);

  return (
    <AppCard>
      <Statistic
        title={<StatTitle>Onboarding Guide</StatTitle>}
        valueStyle={{
          fontSize: 14,
        }}
        valueRender={() => (
          <div className="mt-8">
            <Steps
              current={current}
              onChange={(value) => {
                if (value === steps.length - 1) {
                  setCurrent(value + 1);
                } else {
                  setCurrent(value);
                }
              }}
              direction="vertical"
              size="small"
              items={steps.map((step, i) => ({
                ...step,
                description: (
                  <div className="flex">
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 font-semibold text-primary hover:text-primary/80"
                    >
                      Complete this step <ArrowRightAltRounded />
                    </a>
                  </div>
                ),
              }))}
            />
          </div>
        )}
      />
    </AppCard>
  );
};
