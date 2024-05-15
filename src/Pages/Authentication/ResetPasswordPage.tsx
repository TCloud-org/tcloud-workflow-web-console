import { AMS_RESET_PASSWORD_ENDPOINT } from "Config/AMSEndpointConfig";
import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContainer } from "LayoutComponents/AuthContainer";
import { AuthContent } from "LayoutComponents/AuthContent";
import { Col, Form, Input, Typography, message, theme } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  const { resetToken } = useParams();

  const [loading, setLoading] = useState<boolean>(false);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const newPassword = form.getFieldValue("newPassword");
    const confirmPassword = form.getFieldValue("confirmPassword");
    if (newPassword === confirmPassword) {
      const res = await axios
        .post(AMS_RESET_PASSWORD_ENDPOINT, {
          token: resetToken,
          password: newPassword,
        })
        .then((res) => res)
        .catch((err) => {
          return undefined;
        });
      if (res) {
        messageApi.success("Your password has been resetted successfully.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        messageApi.error("Failed to reset your password.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <AuthContent>
        <Col
          {...Span[2]}
          className="z-10 flex flex-col justify-center items-center"
        >
          <AuthContainer>
            <AppLogoText />

            <Typography.Title level={3}>Reset your password</Typography.Title>

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
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="New password"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The new password that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="Confirm password"
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
            </AppForm>
          </AuthContainer>
        </Col>

        <Col
          {...Span[2]}
          className="absolute top-0 left-0 right-0 bottom-0 lg:relative z-0"
        >
          <AuthImageDisplay imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/side-bg.jpg" />
        </Col>
      </AuthContent>
    </>
  );
};
