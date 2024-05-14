import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { AMS_CREATE_CHECKOUT_SESSION_ENDPOINT } from "Config/AMSEndpointConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppButton } from "DataEntryComponents/AppButton";
import { Flex, Typography, theme } from "antd";
import axios from "axios";
import { Account, ProductTierType, ProductType } from "features/auth/authSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

export const SubscriptionPlanCard = (props: { data: any }) => {
  const accessToken = useSelector((state: any) => state.auth.token);
  const account: Account = useSelector((state: any) => state.auth.account);
  const tier =
    account.productTiers?.find(
      (item) => item.product === ProductType.STEP_WORKFLOW
    )?.tier || ProductTierType.FREE_TIER;
  const { token } = theme.useToken();
  const { data } = props;

  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = async () => {
    if (data.key === "freeTier") {
      return;
    }
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const formData = { plan: data.key, email: account.email };

    const session = await axios
      .post(AMS_CREATE_CHECKOUT_SESSION_ENDPOINT, formData, config)
      .then((res) => JSON.parse(JSON.stringify(res.data as string)));

    setLoading(false);

    window.location.href = session.url;
  };

  return (
    <AppCard title={data.plan} style={{ flex: 1 }}>
      <Flex vertical gap={16}>
        <Typography.Paragraph
          style={{
            margin: 0,
            height: 64,
            overflow: "auto",
          }}
        >
          {data.description}
        </Typography.Paragraph>

        <Typography.Text
          style={{
            fontWeight: 500,
            fontSize: 16,
            textAlign: "center",
            height: 64,
          }}
        >
          <Typography.Text style={{ fontSize: 24, fontWeight: 700 }}>
            {data.price}
          </Typography.Text>{" "}
          {data.unit}
        </Typography.Text>

        <AppButton
          type="primary"
          disabled={tier.toLowerCase() === data.key.toLowerCase()}
          onClick={handleSelect}
          loading={loading}
        >
          {tier.toLowerCase() === data.key.toLowerCase() ? "Current" : "Select"}
        </AppButton>

        {data.features.map((feature: string, i: number) => (
          <Flex gap={16} key={i} align="flex-start">
            <CheckCircleOutlineRounded
              style={{ color: token.colorSuccess, fontSize: 18 }}
              className="mt-[2px]"
            />

            <Typography.Text>{feature}</Typography.Text>
          </Flex>
        ))}
      </Flex>
    </AppCard>
  );
};
