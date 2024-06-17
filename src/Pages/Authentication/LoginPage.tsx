import { TokenResponse } from "@react-oauth/google";
import { GoogleLoginButton } from "AuthComponents/GoogleLoginButton";
import { AMS_SIGN_IN_ENDPOINT } from "Config/AMSEndpointConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppLine } from "LayoutComponents/AppLine";
import { AuthContainer } from "LayoutComponents/AuthContainer";
import { AuthContent } from "LayoutComponents/AuthContent";
import { camelToUpperCaseUnderscore } from "Utils/StringUtils";
import {
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Typography,
  message,
  theme,
} from "antd";
import axios from "axios";
import { Account, AuthType, login, setToken } from "features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const product = searchParams.get("product");
  const tier = searchParams.get("tier");
  const { redirectTo } = location.state || {};
  const [messageApi, contextHolder] = message.useMessage();

  const rememberMeToken = useSelector(
    (state: any) => state.auth.rememberMeToken
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [googleSignInLoading, setGoogleSignInLoading] =
    useState<boolean>(false);
  const [emailSignInLoading, setEmailSignInLoading] = useState<boolean>(false);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [redirectTo, navigate]);

  useEffect(() => {
    if (rememberMeToken) {
      const decoded: any = jwtDecode(rememberMeToken);
      form.setFieldsValue({
        email: decoded.e,
        rememberMe: true,
      });
    }
  }, [rememberMeToken, form]);

  const handleSignUp = () => {
    navigate(`/sign-up?${searchParams}`);
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
    const credentials = {
      email: res["email"],
      firstName: res["given_name"],
      lastName: res["family_name"],
      isEmailVerified: res["email_verified"],
      accessToken: tokenResponse.access_token,
    };

    const productTiers =
      product && tier
        ? [
            {
              product: camelToUpperCaseUnderscore(product),
              tier: camelToUpperCaseUnderscore(tier),
            },
          ]
        : [];
    const formData = {
      email: credentials.email,
      authType: AuthType.GOOGLE,
      credentials: credentials,
      productTiers,
    };

    const systemSignIn = await axios
      .post(AMS_SIGN_IN_ENDPOINT, formData)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        messageApi.error("Login failed. Please try again");
      });

    if (systemSignIn?.account) {
      const sysAccount: Account = systemSignIn.account;

      dispatch(
        login({
          token: undefined,
          account: {
            email: sysAccount.email,
            firstName: sysAccount.firstName,
            lastName: sysAccount.lastName,
            authType: sysAccount.authType,
            isEmailVerified: sysAccount.isEmailVerified,
            phoneNumber: sysAccount.phoneNumber,
            createdAt: sysAccount.createdAt,
            productTiers: sysAccount.productTiers,
          } as Account,
        })
      );
    }

    setGoogleSignInLoading(false);

    if (systemSignIn?.isNewUser) {
      navigate(`/add-payment-method?${searchParams}`);
    } else {
      dispatch(setToken(systemSignIn?.token));
      navigate("/");
    }
  };

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleSignIn = async () => {
    setEmailSignInLoading(true);

    const productTiers =
      product && tier
        ? [
            {
              product: camelToUpperCaseUnderscore(product),
              tier: camelToUpperCaseUnderscore(tier),
            },
          ]
        : [];
    const formData = {
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
      authType: AuthType.EMAIL,
      productTiers,
    };
    const res = await axios
      .post(AMS_SIGN_IN_ENDPOINT, formData)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        messageApi.error("Login failed. Please try again");
      });

    if (res) {
      const isRememberMe = form.getFieldValue("rememberMe");

      if (res && res?.account?.isEmailVerified) {
        dispatch(
          login({
            token: undefined,
            account: res.account,
            rememberMeToken: isRememberMe ? res.token : undefined,
          })
        );
        if (res?.isNewUser) {
          navigate(`/add-payment-method?${searchParams}`);
        } else {
          dispatch(setToken(res?.token));
          navigate("/");
        }
      } else {
        navigate(`/email-verification?${searchParams}`, {
          state: {
            data: {
              account: res.account,
              rememberMeToken: isRememberMe ? res.token : undefined,
              verificationToken: res.verificationToken,
            },
          },
        });
      }
    }

    setEmailSignInLoading(false);
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
              <Flex justify="space-between" align="center">
                <Form.Item name="rememberMe" valuePropName="checked">
                  <Checkbox
                    style={{ color: token.colorTextSecondary }}
                    className="hover:!text-white transition-all duration-300"
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <AppButton
                    type="link"
                    className="hover:!text-white transition-all duration-300"
                    style={{ color: token.colorTextSecondary }}
                    onClick={handleForgotPassword}
                  >
                    Forgot your password?
                  </AppButton>
                </Form.Item>
              </Flex>
              <Form.Item>
                <AppButton
                  className="w-full"
                  size="large"
                  type="primary"
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
                      setGoogleSignInLoading(false);
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
          </AuthContainer>
        </Col>
      </AuthContent>
    </>
  );
};
