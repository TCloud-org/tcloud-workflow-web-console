import { Span } from "Config/DataDisplayInterface";
import { AppRow } from "LayoutComponents/AppRow";
import { SubscriptionPlanCard } from "SubscriptionComponents/SubscriptionPlanCard";
import { Col, Flex } from "antd";
import { ProductTierType } from "features/auth/authSlice";

const plans = [
  {
    key: ProductTierType.FREE_TIER,
    plan: "Free Tier",
    description: `Experience our platform with limited usage and access at no cost.`,
    price: "Free",
    unit: "$0.000025 thereafter",
    features: [
      "Up to 5000 transitions",
      "Limited access to our RESTful Step Workflow APIs",
      "Tracking",
      "1 day workflow task retention",
      "Customer support",
    ],
  },
  {
    key: ProductTierType.STARTUP,
    plan: "Startup",
    description: `Scale your usage and enjoy increased access to advanced features.`,
    price: "$0.00005",
    unit: "per transition",
    features: [
      "Free first 5000 transitions",
      "Unlimited transitions",
      "Expanded access to our RESTful Step Workflow APIs",
      "Tracking and querying",
      "Up to 30 days workflow task retention",
      "Ticket support",
      "Customer support",
    ],
  },
  {
    key: ProductTierType.SCALEUP,
    plan: "Scaleup",
    description: `Accelerate Your Growth. Scale and unlock advanced features for accelerated success.`,
    price: "$0.00015",
    unit: "per transition",
    emphasized: true,
    features: [
      "Free first 5000 transitions",
      "Unlimited transitions",
      "Full access to our RESTful Step Workflow APIs",
      "Tracking, querying, batching, and analytics",
      "Up to 90 days workflow task retention",
      "Increased workflow concurrent processing",
      "Ticket support",
      "Customer support",
      "Early access to new features",
    ],
  },
  {
    key: ProductTierType.ENTERPRISE,
    plan: "Enterprise",
    description: `Propel Your Business Forward. Customize your plan to suit your business needs.`,
    price: "Custom pricing",
    features: [
      "Free first 5000 transitions",
      "Unlimited transitions",
      "Full access to our RESTful Step Workflow APIs",
      "Tracking, querying, batching, and analytics",
      "Up to 120 days workflow task retention",
      "Maximized workflow concurrent processing",
      "Proactive monitoring",
      "Ticket support",
      "Customer support",
      "Early access to new features",
    ],
    action: "Contact sales",
    href: "https://thecloudworlds.com/contact",
  },
];

export const SubscriptionPlanPage = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100%" }}>
      <AppRow gutter={[16, 16]}>
        {plans.map((plan, i) => (
          <Col
            key={i}
            {...Span[4]}
            lg={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <SubscriptionPlanCard data={plan} />
          </Col>
        ))}
      </AppRow>
    </Flex>
  );
};
