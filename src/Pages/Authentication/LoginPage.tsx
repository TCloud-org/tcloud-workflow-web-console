import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppLine } from "LayoutComponents/AppLine";
import { AuthContent } from "LayoutComponents/AuthContent";
import { Col, Flex, Form, Input, Typography, theme } from "antd";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-your-password");
  };

  const handleGoogleSuccessSignIn = (
    credentialResponse: CredentialResponse
  ) => {
    console.log(jwtDecode(credentialResponse.credential || ""));
    /**
     * {
    "iss": "https://accounts.google.com",
    "azp": "516814280647-7j117p175p3i4lhvcsfq9u1qe5muul28.apps.googleusercontent.com",
    "aud": "516814280647-7j117p175p3i4lhvcsfq9u1qe5muul28.apps.googleusercontent.com",
    "sub": "109165758253213394821",
    "email": "tungxd301@gmail.com",
    "email_verified": true,
    "nbf": 1713805244,
    "name": "Tung Dinh",
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocJWlM5H0DDUUPJcj4i-CgDlyHLTPvwU9_4crLlNf-87svEgal8=s96-c",
    "given_name": "Tung",
    "family_name": "Dinh",
    "iat": 1713805544,
    "exp": 1713809144,
    "jti": "760cb26bf767ba126477190996cce2426f94db1c"
}
     */
  };

  return (
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
            wrapperCol={Span[1]}
            style={{
              width: "100%",
              padding: "0 64px",
              marginTop: 16,
            }}
          >
            <Form.Item>
              <Input
                style={{
                  padding: "16px",
                  borderRadius: token.borderRadiusLG,
                }}
                placeholder="Email address"
              />
            </Form.Item>
            <Form.Item>
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
            <Flex>
              <Form.Item style={{ width: "100%" }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccessSignIn}
                  onError={() => {
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
  );
};