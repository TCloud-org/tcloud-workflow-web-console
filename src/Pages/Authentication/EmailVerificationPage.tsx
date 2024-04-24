import { AMS_VERIFY_ACCOUNT_ENDPOINT } from "Config/AMSEndpointConfig";
import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContent } from "LayoutComponents/AuthContent";
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
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailVerificationPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = location.state || {};

  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const onFinish: CountdownProps["onFinish"] = () => {
    console.log("finished!");
  };

  const handleVerify = async () => {
    const formData = {
      email: data?.account?.email,
      verificationCode: form.getFieldValue("otp"),
    };
    const isVerified = await axios
      .post(AMS_VERIFY_ACCOUNT_ENDPOINT, formData)
      .then((res) => res.data);

    if (isVerified) {
      dispatch(
        login({
          token: data?.token,
          account: data?.account,
          rememberMeToken: data?.rememberMeToken,
        })
      );
      navigate("/");
    } else {
      messageApi.error("OTP verification failed");
    }
  };

  return (
    <>
      {contextHolder}
      <AuthContent>
        <Col span={12}>
          <AuthImageDisplay
            imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/6225966.jpg"
            resourceUrl="https://www.freepik.com/free-vector/hand-drawn-business-people-communication_20125844.htm#from_view=detail_serie"
            resourceLabel="Image by Freepik"
          />
        </Col>

        <Col span={12}>
          <Flex
            vertical
            align="center"
            gap={16}
            justify="center"
            style={{ height: "100%" }}
          >
            <AppLogoText />

            <Typography.Title level={3}>Verify your email</Typography.Title>

            <Typography.Text>
              A verification code has been sent to{" "}
              <Typography.Text strong>
                {data?.account?.email || "example@company.com"}
              </Typography.Text>
            </Typography.Text>

            <Flex gap={4}>
              <Typography.Text
                style={{ fontSize: 14, color: token.colorTextSecondary }}
              >
                Code expires in
              </Typography.Text>
              <Statistic.Countdown
                valueStyle={{ fontSize: 14, color: token.colorTextSecondary }}
                value={new Date(
                  data?.verificationToken?.expiredAt * 1000
                ).getTime()}
                onFinish={onFinish}
                format="mm:ss"
              />
            </Flex>

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
                  style={{
                    backgroundColor: borderColor,
                    color: token.colorWhite,
                    width: "100%",
                    fontSize: 14,
                    marginTop: 16,
                  }}
                  size="large"
                  onClick={handleVerify}
                >
                  Verify
                </AppButton>
              </Form.Item>

              <Flex justify="center">
                <Form.Item style={{ marginTop: 8 }}>
                  <Typography.Text type="secondary">
                    Didn't receive the code?{" "}
                    <Typography.Link>Resend email</Typography.Link>
                  </Typography.Text>
                </Form.Item>
              </Flex>
            </AppForm>
          </Flex>
        </Col>
      </AuthContent>
    </>
  );
};
