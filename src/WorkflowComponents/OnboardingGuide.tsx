import { ArrowRightAltRounded } from "@mui/icons-material";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { Steps } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import { setOnboardingCurrentProcess } from "features/settings/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  const onboardingCurrentProcess =
    useSelector((state: any) => state.dashboard.onboardingCurrentProcess) || 0;

  return (
    <div>
      <Statistic
        title={<StatTitle>Onboarding Guide</StatTitle>}
        valueStyle={{
          fontSize: 14,
        }}
        valueRender={() => (
          <div className="mt-8">
            <Steps
              current={onboardingCurrentProcess}
              onChange={(value) => {
                if (value === steps.length - 1) {
                  dispatch(setOnboardingCurrentProcess(value + 1));
                } else {
                  dispatch(setOnboardingCurrentProcess(value));
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
    </div>
  );
};
