import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

export const SubscriptionPage = () => {
  const navigate = useNavigate();

  const handleChoosePlan = () => {
    navigate("/subscription/plan");
  };

  return (
    <AppSpace>
      <Typography.Text>Subscription plan: Free</Typography.Text>
      <AppButton onClick={handleChoosePlan}>Choose plan</AppButton>
    </AppSpace>
  );
};
