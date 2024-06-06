import { Span } from "Config/DataDisplayInterface";
import { AppRow } from "LayoutComponents/AppRow";
import { SubscriptionPlanCard } from "SubscriptionComponents/SubscriptionPlanCard";
import { Col, Flex } from "antd";
import { ProductTierType } from "features/auth/authSlice";

const plans = [
  {
    key: ProductTierType.LITE,
    plan: "Lite",
    price: `Free for everyone`,
    features: [
      "Up to 3000 transitions",
      "RESTful Step Workflow APIs",
      "Tracking",
      "1 day workflow job retention",
      "Up to 5 collaborators",
      "Customer support",
    ],
  },
  {
    key: ProductTierType.PRO,
    plan: "Pro",
    price: `$1 per 100 transitions`,
    emphasized: true,
    plus: "Everything in Lite, plus:",
    features: [
      "Querying, batching, and analytics",
      "Up to 60 days workflow job retention",
      "Increased workflow concurrent processing",
      "Up to 50 collaborators",
      "Ticket support",
      "Early access to new features",
    ],
  },
  {
    key: ProductTierType.ENTERPRISE,
    plan: "Enterprise",
    price: `$3 per 100 transitions`,
    plus: "Everything in Pro, plus:",
    features: [
      "Up to 120 days workflow job retention",
      "Maximized workflow concurrent processing",
      "Proactive monitoring",
      "Unlimited collaborators",
    ],
    action: "Or talk to our sales team",
    contact: "https://thecloudworlds.com/contact",
  },
];

export const SubscriptionPlanPage = () => {
  return (
    <Flex justify="center" align="center" style={{ height: "100%" }}>
      <AppRow gutter={[16, 16]}>
        {plans.map((plan, i) => (
          <Col
            key={i}
            {...Span[3]}
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
