import { CreditCardOutlined } from "@ant-design/icons";
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material";
import {
  AMS_CREATE_CHECKOUT_SESSION_ENDPOINT,
  AMS_ISSUE_TOKEN,
} from "Config/AMSEndpointConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AppButton } from "DataEntryComponents/AppButton";
import { AuthContainer } from "LayoutComponents/AuthContainer";
import { AuthContent } from "LayoutComponents/AuthContent";
import { CreditCardSvg } from "SvgIcons/CreditCardSvg";
import { Col, Spin, Typography } from "antd";
import axios from "axios";
import { Account, setToken } from "features/auth/authSlice";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const AddPaymentMethodPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const sessionId = searchParams.get("session_id");
  const account: Account = useSelector((state: any) => state.auth.account);
  const [loading, setLoading] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const issueToken = useCallback(async () => {
    if (success && sessionId) {
      setRedirecting(true);
      const formData = {
        sessionId: sessionId,
        email: account.email,
      };
      const res = await axios
        .post(AMS_ISSUE_TOKEN, formData)
        .then((res) => res.data);
      const authToken = res.token;
      dispatch(setToken(authToken));
      navigate("/");
      setRedirecting(false);
    }
  }, [sessionId, success, account, dispatch, navigate]);

  useEffect(() => {
    issueToken();
  }, [issueToken]);

  const handleAddPaymentMethod = async () => {
    setLoading(true);

    const formData = {
      account: account,
    };
    const res = await axios
      .post(AMS_CREATE_CHECKOUT_SESSION_ENDPOINT, formData)
      .then((res) => res.data);
    const redirectUrl = res.redirectUrl;

    setLoading(false);
    window.location.href = redirectUrl;
  };

  const renderContent = () => {
    if (success) {
      return (
        <Fragment>
          {redirecting && (
            <div className="flex items-center gap-4">
              <Spin />

              <p className="text-paragraph text-base">Redirecting...</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            <CheckCircleRounded className="text-green-500 !text-[32px]" />

            <p className="text-lg text-white font-semibold">
              You've successfully added a default paymend method
            </p>
          </div>
        </Fragment>
      );
    }

    if (canceled) {
      return (
        <Fragment>
          <p className="text-paragraph text-base">Please try again</p>

          <div className="flex items-center gap-4">
            <CancelRounded className="text-red-500 !text-[32px]" />

            <p className="text-lg text-white font-semibold">
              Failed to add a default payment method
            </p>
          </div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <AppLogoText />

        <Typography.Title level={3}>Add Payment Method</Typography.Title>
        <p className="text-paragraph mb-4">
          You will not be charged for usage below the minimum cost
        </p>

        <div className="text-[20em]">
          <CreditCardSvg />
        </div>

        <AppButton
          type="primary"
          icon={<CreditCardOutlined />}
          className="mt-8"
          loading={loading}
          onClick={handleAddPaymentMethod}
        >
          Add payment method via <strong className="ml-1">Stripe</strong>
        </AppButton>
      </Fragment>
    );
  };

  return (
    <AuthContent>
      <Col
        {...Span[1]}
        className="z-10 flex flex-col justify-center items-center"
      >
        <AuthContainer>{renderContent()}</AuthContainer>
      </Col>
    </AuthContent>
  );
};
