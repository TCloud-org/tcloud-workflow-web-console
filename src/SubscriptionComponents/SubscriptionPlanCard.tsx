import { AMS_UPDATE_ACCOUNT_ENDPOINT } from "Config/AMSEndpointConfig";
import { UpdateAccountResponse } from "Config/AuthConfig";
import { AppButton } from "DataEntryComponents/AppButton";
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

import { CheckRounded } from "@mui/icons-material";

export const SubscriptionPlanCard = (props: { data: any }) => {
  const { data } = props;

  const dispatch = useDispatch();

  const accessToken = useSelector((state: any) => state.auth.token);
  const account: Account = useSelector((state: any) => state.auth.account);
  const tier =
    account.productTiers?.find(
      (item) => item.product === ProductType.STEP_WORKFLOW
    )?.tier || ProductTierType.LITE;
  const isCurrent = tier === data.key;

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
    <div
      className={`glass-card !rounded-3xl !p-10 w-full gap-12 flex flex-col border h-full relative`}
    >
      {isCurrent && (
        <p className="glass-pill absolute left-4 top-4 px-4 py-1">Current</p>
      )}

      <div className="flex flex-col h-full gap-12">
        <div className="text-center flex flex-col gap-2">
          <div className="text-[32px] font-medium text-white">{data.plan}</div>
          <div className="text-gradient text-base">{data.price}</div>
        </div>

        <div className="flex flex-col gap-12">
          {data.plus && (
            <div className="text-neutral-7 text-base">{data.plus}</div>
          )}

          <div className="flex flex-col gap-2">
            {data.features.map((feature: string, i: number) => (
              <div className="flex gap-[10px]" key={i}>
                <CheckRounded className="text-washed-purple-200" />
                <span className="text-neutral-7 text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <AppButton
          type="primary"
          onClick={handleSelect}
          className="w-full"
          disabled={isCurrent}
          loading={loading}
        >
          Select
        </AppButton>

        {data.action && (
          <a
            className="text-washed-purple-200 hover:text-washed-purple-400 transition-all duration-300"
            href={data.contact}
          >
            {data.action}
          </a>
        )}
      </div>
    </div>
  );
};
