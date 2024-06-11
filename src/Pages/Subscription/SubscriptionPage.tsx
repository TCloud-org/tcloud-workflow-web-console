import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { capitalizeEachWord } from "Utils/StringUtils";
import { Typography } from "antd";
import { Account, ProductTierType, ProductType } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SubscriptionPage = () => {
  const navigate = useNavigate();

  const account: Account = useSelector((state: any) => state.auth.account);
  const tier =
    account.productTiers?.find(
      (item) => item.product === ProductType.STEP_WORKFLOW
    )?.tier || ProductTierType.LITE;

  const handleChoosePlan = () => {
    navigate("/subscription/plan");
  };

  return (
    <AppSurface>
      <AppSpace>
        <PageTitle>Plan Information</PageTitle>
        <Typography.Text strong>Current Plan</Typography.Text>
        <p>{capitalizeEachWord(tier.toLowerCase())}</p>
        <AppButton type="primary" onClick={handleChoosePlan}>
          Choose plan
        </AppButton>
      </AppSpace>
    </AppSurface>
  );
};
