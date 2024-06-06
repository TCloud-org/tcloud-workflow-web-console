import { AMS_SIGN_UP_ENDPOINT } from "Config/AMSEndpointConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContainer } from "LayoutComponents/AuthContainer";
import { AuthContent } from "LayoutComponents/AuthContent";
import { getInvitationToken } from "Network/SecurityFetch";
import { camelToUpperCaseUnderscore } from "Utils/StringUtils";
import {
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Typography,
  message,
  theme,
} from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const invitationToken = searchParams.get("invitationToken");
  const product = searchParams.get("product");
  const tier = searchParams.get("tier");
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const [emailSignUpLoading, setEmailSignUpLoading] = useState<boolean>(false);

  const fetchInvitationToken = useCallback(async () => {
    if (invitationToken) {
      const res = await getInvitationToken(invitationToken);
      form.setFieldValue("email", res.invitationToken.receiver);
    }
  }, [invitationToken, form]);

  useEffect(() => {
    fetchInvitationToken();
  }, [fetchInvitationToken]);

  const handleLogin = () => {
    navigate("/");
  };

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleSignUp = async () => {
    setEmailSignUpLoading(true);

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
      firstName: form.getFieldValue("firstName"),
      lastName: form.getFieldValue("lastName"),
      productTiers: productTiers,
    };
    const res = await axios
      .post(AMS_SIGN_UP_ENDPOINT, formData)
      .then((res) => res.data)
      .catch((err) => {
        messageApi.error("Sign up failed. Please try again");
        return undefined;
      });
    if (res) {
      let href = "/email-verification";
      if (invitationToken) {
        href += `?invitationToken=${invitationToken}`;
      }
      navigate(href, {
        state: {
          data: res,
        },
      });
    }
    setEmailSignUpLoading(false);
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

            <Typography.Title level={3}>Create an account</Typography.Title>
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
              <Row gutter={[24, 0]}>
                <Col {...Span[2]}>
                  <Form.Item style={{ flex: 1 }} name="firstName">
                    <Input
                      style={{
                        padding: "16px",
                        borderRadius: token.borderRadiusLG,
                      }}
                      placeholder="First name"
                    />
                  </Form.Item>
                </Col>

                <Col {...Span[2]}>
                  <Form.Item style={{ flex: 1 }} name="lastName">
                    <Input
                      style={{
                        padding: "16px",
                        borderRadius: token.borderRadiusLG,
                      }}
                      placeholder="Last name"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="email">
                <Input
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="Email address"
                />
              </Form.Item>
              <Form.Item style={{ flex: 1 }} name="password">
                <Input.Password
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="Password"
                />
              </Form.Item>
              <Flex justify="flex-start">
                <Form.Item>
                  <Checkbox style={{ color: token.colorTextSecondary }}>
                    I agree to the <a href="/terms-and-conditions">Term</a> &{" "}
                    <a href="privacy-policy">Privacy</a>
                  </Checkbox>
                </Form.Item>
              </Flex>
              <Form.Item>
                <AppButton
                  type="primary"
                  className="w-full"
                  size="large"
                  onClick={handleSignUp}
                  loading={emailSignUpLoading}
                >
                  Sign Up
                </AppButton>
              </Form.Item>
              <Form.Item>
                <Flex justify="center">
                  <Typography.Text type="secondary">
                    Already have an account?{" "}
                    <AppButton
                      style={{ margin: 0, padding: 0 }}
                      type="link"
                      onClick={handleLogin}
                    >
                      Login
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
