import { CheckCircleOutlineRounded } from "@mui/icons-material";
import { AMS_UPDATE_ACCOUNT_ENDPOINT } from "Config/AMSEndpointConfig";
import { UpdateAccountResponse } from "Config/AuthConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppButton } from "DataEntryComponents/AppButton";
import { Flex, Typography, theme } from "antd";
import axios from "axios";
import {
  Account,
  ProductTierType,
  ProductType,
  setAccount,
  setToken,
} from "features/auth/authSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SubscriptionPlanCard = (props: { data: any }) => {
  const dispatch = useDispatch();

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
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    let productTiers = [...(account.productTiers || [])];
    const index = account.productTiers?.findIndex(
      (item) => item.product === ProductType.STEP_WORKFLOW
    );
    if (index === undefined || index === -1) {
      productTiers.push({ product: ProductType.STEP_WORKFLOW, tier: data.key });
    } else {
      productTiers[index] = {
        product: ProductType.STEP_WORKFLOW,
        tier: data.key,
      };
    }

    const formData = {
      ...account,
      productTiers,
    };
    console.log(formData);

    const res = await axios
      .post(AMS_UPDATE_ACCOUNT_ENDPOINT, formData, config)
      .then((res) => res.data as UpdateAccountResponse);

    if (res) {
      dispatch(setAccount(res.account));
      dispatch(setToken(res.token));
    }

    setLoading(false);
  };

  return (
    <AppCard title={data.plan} style={{ flex: 1 }}>
      <Flex vertical gap={16}>
        <Typography.Paragraph
          style={{
            margin: 0,
            overflow: "auto",
          }}
          className="h-16 lg:h-24"
        >
          {data.description}
        </Typography.Paragraph>

        <Flex vertical className="h-16 lg:h-24 text-center">
          <Typography.Text style={{ fontSize: 20, fontWeight: 700 }}>
            {data.price}
          </Typography.Text>
          <Typography.Text
            style={{
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {data.unit}
          </Typography.Text>
        </Flex>

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
