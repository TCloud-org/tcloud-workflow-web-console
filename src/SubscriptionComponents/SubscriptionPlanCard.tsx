import { CheckOutlined } from "@ant-design/icons";
import { AMS_CREATE_CHECKOUT_SESSION_ENDPOINT } from "Config/AMSEndpointConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { Card, Flex, Typography, theme } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const SubscriptionPlanCard = (props: {
  data: any;
  currentPlan?: string;
}) => {
  const accessToken = useSelector((state: any) => state.auth.token);
  const { token } = theme.useToken();
  const { data, currentPlan } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = async () => {
    if (data.key === "FREE") {
      return;
    }
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const formData = { plan: data.key };

    const session = await axios
      .post(AMS_CREATE_CHECKOUT_SESSION_ENDPOINT, formData, config)
      .then((res) => JSON.parse(JSON.stringify(res.data as string)));

    setLoading(false);

    window.location.href = session.url;
  };

  return (
    <Card title={data.plan} style={{ flex: 1 }} hoverable>
      <Flex vertical gap={16}>
        <Typography.Paragraph
          style={{
            margin: 0,
            height: 150,
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
          disabled={currentPlan === data.key}
          onClick={handleSelect}
          loading={loading}
        >
          {currentPlan === data.key ? "Current" : "Select"}
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
