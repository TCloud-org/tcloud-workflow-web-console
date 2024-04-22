import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContent } from "LayoutComponents/AuthContent";
import { Col, Flex, Form, Input, Typography, theme } from "antd";

export const ForgotPasswordPage = () => {
  const { token } = theme.useToken();

  return (
    <AuthContent>
      <Col span={12}>
        <AuthImageDisplay
          imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/6221538.jpg"
          resourceUrl="https://www.freepik.com/free-vector/hand-drawn-illustrated-business-planning_20124546.htm"
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

          <Typography.Title level={3}>Forgot your password?</Typography.Title>
          <Typography.Text>
            Enter your email below to receive password reset instructions
          </Typography.Text>
          <Typography.Text type="secondary">
            Didn't receive instructions?{" "}
            <AppButton type="link" style={{ padding: 0 }}>
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
