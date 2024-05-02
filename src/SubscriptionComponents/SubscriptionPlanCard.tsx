import { CheckOutlined } from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { Card, Flex, Typography, theme } from "antd";

export const SubscriptionPlanCard = (props: {
  data: any;
  currentPlan?: string;
}) => {
  const { token } = theme.useToken();
  const { data, currentPlan } = props;

  return (
    <Card title={data.plan} style={{ flex: 1 }} hoverable>
      <Flex vertical gap={16}>
        <Typography.Paragraph
          style={{
            margin: 0,
            height: 120,
            overflow: "auto",
          }}
        >
          {data.description}
        </Typography.Paragraph>

        <Typography.Text style={{ fontWeight: 500, fontSize: 20 }}>
          <Typography.Text style={{ fontSize: 32, fontWeight: 800 }}>
            {data.price}
          </Typography.Text>{" "}
          USD per month
        </Typography.Text>

        <AppButton
          type={data.emphasized ? "primary" : "default"}
          disabled={currentPlan === data.plan}
        >
          {currentPlan === data.plan ? "Current" : "Upgrade"}
        </AppButton>

        {data.features.map((feature: string, i: number) => (
          <Flex gap={16} key={i}>
            <CheckOutlined style={{ color: token.colorSuccess }} />

            <Typography.Text>{feature}</Typography.Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  );
};
