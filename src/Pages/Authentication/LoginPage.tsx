import { TokenResponse } from "@react-oauth/google";
import { GoogleLoginButton } from "AuthComponents/GoogleLoginButton";
import { AMS_SIGN_IN_ENDPOINT } from "Config/AMSEndpointConfig";
import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppLine } from "LayoutComponents/AppLine";
import { AuthContent } from "LayoutComponents/AuthContent";
import { Col, Flex, Form, Input, Typography, message, theme } from "antd";
import axios from "axios";
import { login } from "features/auth/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [googleSignInLoading, setGoogleSignInLoading] =
    useState<boolean>(false);
  const [emailSignInLoading, setEmailSignInLoading] = useState<boolean>(false);

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-your-password");
  };

  const handleGoogleSuccessSignIn = async (
    tokenResponse: Omit<
      TokenResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    setGoogleSignInLoading(true);

    const res = await axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      )
      .then((res) => res.data);

    dispatch(
      login({
        token: tokenResponse.access_token,
        account: {
          email: res.email,
          firstName: res["given_name"],
          lastName: res["family_name"],
          emailVerified: res["email_verified"],
        },
      })
    );
    setGoogleSignInLoading(false);
    /**
     * {
    {
    "sub": "109165758253213394821",
    "name": "Tung Dinh",
    "given_name": "Tung",
    "family_name": "Dinh",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJWlM5H0DDUUPJcj4i-CgDlyHLTPvwU9_4crLlNf-87svEgal8=s96-c",
    "email": "tungxd301@gmail.com",
    "email_verified": true,
    "locale": "en"
}
     */
  };

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleSignIn = async () => {
    setEmailSignInLoading(true);

    const formData = {
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
    };
    const res = await axios
      .post(AMS_SIGN_IN_ENDPOINT, formData)
      .then((res) => res.data)
      .catch((err) => messageApi.error("Login failed. Please try again"));
    if (res) {
      dispatch(login({ token: res.token, account: res.account }));
    }

    setEmailSignInLoading(false);
  };

  return (
    <>
      {contextHolder}
      <AuthContent>
        <Col span={12}>
          <AuthImageDisplay
            imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/6225958.jpg"
            resourceUrl="https://www.freepik.com/free-vector/hand-drawn-illustration-business-planning_20124625.htm#fromView=search&page=3&position=24&uuid=86237bfa-c9e7-4467-92b5-0606a5715ad3"
            resourceLabel="Image by freepik"
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

            <Typography.Title level={3}>Welcome</Typography.Title>
            <AppForm
              form={form}
              wrapperCol={Span[1]}
              onValuesChange={handleValuesChange}
              style={{
                width: "100%",
                padding: "0 64px",
                marginTop: 16,
              }}
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
              <Form.Item name="password">
                <Input.Password
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="flex-end">
                  <AppButton
                    type="link"
                    style={{ color: token.colorTextSecondary }}
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </AppButton>
                </Flex>
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
                  onClick={handleSignIn}
                  loading={emailSignInLoading}
                >
                  Login
                </AppButton>
              </Form.Item>
              <Form.Item>
                <Flex gap={16} align="center">
                  <AppLine />
                  <div style={{ color: token.colorTextSecondary }}>OR</div>
                  <AppLine />
                </Flex>
              </Form.Item>
              <Flex justify="center" align="center">
                <Form.Item style={{ width: "100%" }}>
                  <GoogleLoginButton
                    loading={googleSignInLoading}
                    style={{
                      width: "100%",
                      fontSize: 14,
                    }}
                    size="large"
                    initializeLoading={setGoogleSignInLoading}
                    onSignInSuccess={handleGoogleSuccessSignIn}
                    onSignInError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </Form.Item>
              </Flex>
              <Form.Item>
                <Flex justify="center">
                  <Typography.Text type="secondary">
                    Don't have an account?{" "}
                    <AppButton
                      style={{ margin: 0, padding: 0 }}
                      type="link"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </AppButton>
                  </Typography.Text>
                </Flex>
              </Form.Item>
            </AppForm>
          </Flex>
        </Col>
      </AuthContent>
    </>
  );
};
