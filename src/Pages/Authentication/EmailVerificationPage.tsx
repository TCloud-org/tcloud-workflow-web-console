import {
  AMS_SEND_VERIFICATION_CODE_ENDPOINT,
  AMS_VERIFY_ACCOUNT_ENDPOINT,
} from "Config/AMSEndpointConfig";
import { Span } from "Config/DataDisplayInterface";
import { SCS_PROCESS_INVITATION_URL } from "Config/SCSEndpointConfig";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContainer } from "LayoutComponents/AuthContainer";
import { AuthContent } from "LayoutComponents/AuthContent";
import { InvitationStatus, InvitationToken } from "Network/SecurityFetch";
import {
  Col,
  CountdownProps,
  Flex,
  Form,
  Input,
  Statistic,
  Typography,
  message,
  theme,
} from "antd";
import axios from "axios";
import { login } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailVerificationPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const invitationToken = searchParams.get("invitationToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = location.state || {};

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const [codeExpiredAt, setCodeExpiredAt] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [codeExpired, setCodeExpired] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setCodeExpiredAt(new Date(data.verificationToken?.expiredAt));
    }
  }, [data]);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
    if (values.otp && values.otp.length === 6) {
      handleVerify();
    }
  };

  const onFinish: CountdownProps["onFinish"] = () => {
    setCodeExpired(true);
  };

  const handleVerify = async () => {
    setLoading(true);
    const formData = {
      email: data?.account?.email,
      verificationCode: form.getFieldValue("otp"),
    };
    const isVerified = await axios
      .post(AMS_VERIFY_ACCOUNT_ENDPOINT, formData)
      .then((res) => res.data);
    if (isVerified && invitationToken) {
      const formData = {
        token: invitationToken,
        action: InvitationStatus.ACCEPTED.toString(),
      };
      const res = await axios
        .post(SCS_PROCESS_INVITATION_URL, formData)
        .then((res) => res.data as InvitationToken)
        .catch((err) => {
          console.error(err);
          return undefined;
        });

      if (res) {
        messageApi.success("Successfully processed the invitation acceptation");
      } else {
        messageApi.error("Failed to process the invitation request");
      }
    }

    setTimeout(() => {
      if (isVerified) {
        dispatch(
          login({
            token: undefined,
            account: data?.account,
            rememberMeToken: data?.rememberMeToken,
          })
        );
        navigate(`/add-payment-method?${searchParams}`);
      } else {
        messageApi.error("OTP verification failed");
      }
      form.resetFields();
      setLoading(false);
    }, 2000);
  };

  const handleResendVerificationCode = async () => {
    const formData = {
      email: data?.account?.email,
    };
    const res = await axios
      .post(AMS_SEND_VERIFICATION_CODE_ENDPOINT, formData)
      .then((res) => res.data);
    if (res) {
      messageApi.success("Resent verification code.");
      setCodeExpired(false);
      setCodeExpiredAt(new Date(res.verificationToken?.expiredAt));
    } else {
      messageApi.error("Failed to resend verification code.");
    }
  };

  return (
    <>
      {contextHolder}
      <AuthContent>
        <Col
          {...Span[1]}
          className="z-10 flex flex-col justify-center items-center"
        >
          <AuthContainer>
            <AppLogoText />

            <Typography.Title level={3}>Verify your email</Typography.Title>

            <Typography.Text className="px-8">
              A verification code has been sent to{" "}
              <Typography.Text strong>
                {data?.account?.email || "example@company.com"}
              </Typography.Text>
            </Typography.Text>

            {!codeExpired ? (
              <Flex gap={4}>
                <Typography.Text
                  style={{ fontSize: 14, color: token.colorTextSecondary }}
                >
                  Code expires in
                </Typography.Text>
                <Statistic.Countdown
                  valueStyle={{ fontSize: 14, color: token.colorTextSecondary }}
                  value={codeExpiredAt.getTime()}
                  onFinish={onFinish}
                  format="mm:ss"
                />
              </Flex>
            ) : (
              <Typography.Text>
                Code has expired.{" "}
                <Typography.Link onClick={handleResendVerificationCode}>
                  Click here to resend email
                </Typography.Link>
              </Typography.Text>
            )}

            <AppForm
              onValuesChange={handleValuesChange}
              form={form}
              wrapperCol={Span[1]}
              style={{
                width: "100%",
                padding: "0 64px",
                marginTop: 16,
              }}
            >
              <Flex justify="center">
                <Form.Item name="otp">
                  <Input.OTP size="large" />
                </Form.Item>
              </Flex>

              <Form.Item>
                <AppButton
                  type="primary"
                  className="w-full"
                  size="large"
                  onClick={handleVerify}
                  loading={loading}
                >
                  Verify
                </AppButton>
              </Form.Item>

              <Flex justify="center">
                <Form.Item style={{ marginTop: 8 }}>
                  <Typography.Text type="secondary">
                    Didn't receive the code?{" "}
                    <Typography.Link onClick={handleResendVerificationCode}>
                      Resend email
                    </Typography.Link>
                  </Typography.Text>
                </Form.Item>
              </Flex>
            </AppForm>
          </AuthContainer>
        </Col>
      </AuthContent>
    </>
  );
};
