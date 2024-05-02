import { AppButton } from "DataEntryComponents/AppButton";
import { Flex, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

export const SubscriptionInvoicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  if (success) {
    return (
      <Flex style={{ height: "100%" }} justify="center" align="center">
        <Result
          status="success"
          title="Payment Successful"
          subTitle="Your payment is confirmed! Let the adventure begin! Start exploring now and unlock a world of possibilities!"
          extra={
            <AppButton
              type="primary"
              key="console"
              onClick={() => navigate("/")}
            >
              Back Home
            </AppButton>
          }
        />
      </Flex>
    );
  }

  if (canceled) {
    return (
      <Result
        status="error"
        title="Payment Failed"
        subTitle="Oops! It looks like your payment didn't go through this time."
        extra={
          <AppButton type="primary" key="console" onClick={() => navigate("/")}>
            Back Home
          </AppButton>
        }
      />
    );
  }

  return null;
};
