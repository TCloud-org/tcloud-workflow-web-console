import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContent } from "LayoutComponents/AuthContent";
import { Col, Flex, Form, Input, Typography, theme } from "antd";

export const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  return (
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
            <Form.Item name="email">
              <Input.Password
                style={{
                  padding: "16px",
                  borderRadius: token.borderRadiusLG,
                }}
                placeholder="New password"
              />
            </Form.Item>
            <Form.Item name="password">
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
              >
                Submit
              </AppButton>
            </Form.Item>
          </AppForm>
        </Flex>
      </Col>
    </AuthContent>
  );
};
