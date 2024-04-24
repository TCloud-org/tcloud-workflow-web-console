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
import { useNavigate, useParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [messageApi, contextHolder] = message.useMessage();

  const { resetToken } = useParams();

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleSubmit = async () => {
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
          messageApi.error("Failed to reset your password.");
          return undefined;
        });
      if (res) {
        messageApi.success("Your password has been resetted successfully.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <AuthContent>
        <Col span={12}>
          <AuthImageDisplay
            imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/6221515.jpg"
            resourceUrl="https://www.freepik.com/free-vector/hand-drawn-business-man-communicating_20125868.htm#from_view=detail_alsolike"
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
              <Form.Item name="newPassword">
                <Input.Password
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="New password"
                />
              </Form.Item>
              <Form.Item name="confirmPassword">
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
                >
                  Submit
                </AppButton>
              </Form.Item>
            </AppForm>
          </Flex>
        </Col>
      </AuthContent>
    </>
  );
};
