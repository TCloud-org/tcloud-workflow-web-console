import { AMS_RESET_PASSWORD_ENDPOINT } from "Config/AMSEndpointConfig";
import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContent } from "LayoutComponents/AuthContent";
import { Col, Flex, Form, Input, Typography, message, theme } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState<boolean>(false);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleResend = async () => {
    const email = form.getFieldValue("email");
    const res = await axios
      .post(AMS_RESET_PASSWORD_ENDPOINT, {
        email,
      })
      .then((res) => res)
      .catch((_) => {
        messageApi.error("Failed to resend password reset request.");
        return undefined;
      });
    if (res) {
      messageApi.success("Resent password reset request.");
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(async () => {
      const res = await axios
        .post(AMS_RESET_PASSWORD_ENDPOINT, {
          email: form.getFieldValue("email"),
        })
        .then((res) => res)
        .catch((_) => {
          messageApi.error("Failed to resend password reset request.");
          return undefined;
        });
      if (res) {
        messageApi.success(
          "Sent password reset request. Please check your inbox."
        );
      }
      setLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <>
      {contextHolder}
      <AuthContent>
        <Col {...Span[2]} className="hidden lg:block">
          <AuthImageDisplay
            imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/6221538.jpg"
            resourceUrl="https://www.freepik.com/free-vector/hand-drawn-illustrated-business-planning_20124546.htm"
            resourceLabel="Image by freepik"
          />
        </Col>
        <Col {...Span[2]}>
          <Flex
            vertical
            align="center"
            gap={16}
            justify="center"
            style={{ height: "100%" }}
          >
            <AppLogoText />

            <Typography.Title level={3}>Forgot your password?</Typography.Title>
            <Typography.Text>
              Enter your email below to receive password reset instructions
            </Typography.Text>
            <Typography.Text type="secondary">
              Didn't receive instructions?{" "}
              <AppButton
                type="link"
                style={{ padding: 0 }}
                onClick={handleResend}
              >
                <Typography.Text
                  underline
                  style={{
                    color: token.colorTextSecondary,
                  }}
                >
                  Resend email
                </Typography.Text>
              </AppButton>
            </Typography.Text>
            <AppForm
              wrapperCol={Span[1]}
              style={{
                width: "100%",
                padding: "0 64px",
                marginTop: 16,
              }}
              onValuesChange={handleValuesChange}
            >
              <Form.Item name="email">
                <Input
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="Email address"
                />
              </Form.Item>

              <Form.Item>
                <AppButton
                  style={{
                    backgroundColor: borderColor,
                    color: token.colorWhite,
                    width: "100%",
                    fontSize: 14,
                  }}
                  size="large"
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Submit
                </AppButton>
              </Form.Item>

              <Flex justify="center">
                <Form.Item>
                  <AppButton onClick={handleBackToLogin} type="link">
                    Back to Login
                  </AppButton>
                </Form.Item>
              </Flex>
            </AppForm>
          </Flex>
        </Col>
      </AuthContent>
    </>
  );
};
