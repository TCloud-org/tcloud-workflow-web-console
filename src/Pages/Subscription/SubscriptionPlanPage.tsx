import { Span } from "Config/DataDisplayInterface";
import { AppRow } from "LayoutComponents/AppRow";
import { SubscriptionPlanCard } from "SubscriptionComponents/SubscriptionPlanCard";
import { Col } from "antd";

const plans = [
  {
    key: "FREE",
    plan: "Free",
    description: `The Free Plan is perfect for individuals or small teams who want to explore the basic features of our service. With limited usage and access, it provides a great way to get started with our platform at no cost.`,
    price: 0,
    features: [
      "Limited to 1 user (individual)",
      "Limited to 100 API workflows",
      "Limited to 50 emails",
      "Email support available",
    ],
  },
  {
    key: "INDIVIDUAL",
    plan: "Individual",
    description: `The Individual Plan is designed for solo entrepreneurs, freelancers, or individuals who need more capabilities and resources than the Free Plan offers. It provides increased usage limits and access to additional features, making it suitable for small-scale projects or personal use.`,
    price: 9,
    features: [
      "Limited to 1 user (individual)",
      "Limited to 1000 API workflows",
      "Limited to 500 emails",
      "Limited to 1 store and 100 publications",
      "24/7 email support",
    ],
  },
  {
    key: "BUSINESS",
    plan: "Business",
    emphasized: true,
    description: `The Business Plan is ideal for small businesses, startups, or teams that require enhanced functionality, scalability, and support. With expanded usage limits, advanced features, and priority support, it offers everything you need to grow and manage your business efficiently.`,
    price: 49,
    features: [
      "Limited to 100 users (business)",
      "Limited to 10000 API workflows",
      "Limited to 5000 emails",
      "Limited to 5 store and unlimited publications",
      "Metrics",
      "24/7 email support",
    ],
  },
];
export const SubscriptionPlanPage = () => {
  return (
    <AppRow gutter={[16, 16]}>
      {plans.map((plan, i) => (
        <Col
          key={i}
          {...Span[3]}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <SubscriptionPlanCard data={plan} currentPlan="FREE" />
        </Col>
      ))}
    </AppRow>
  );
};
