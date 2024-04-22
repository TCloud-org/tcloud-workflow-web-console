import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppLogoText } from "DataDisplayComponents/AppLogoText";
import { AuthImageDisplay } from "DataDisplayComponents/AuthImageDisplay";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AuthContent } from "LayoutComponents/AuthContent";
import { Checkbox, Col, Flex, Form, Input, Typography, theme } from "antd";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <AuthContent>
      <Col span={12}>
        <AuthImageDisplay
          imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/6221508.jpg"
          resourceUrl="https://www.freepik.com/free-vector/hand-drawn-innovation-concept_20286043.htm#&position=8&from_view=collections&uuid=5a145899-aec1-4149-aaa3-f325d2281b06"
          resourceLabel="Image by pikisuperstar on Freepik"
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
                placeholder="Full name"
              />
            </Form.Item>
            <Form.Item>
              <Input
                style={{
                  padding: "16px",
                  borderRadius: token.borderRadiusLG,
                }}
                placeholder="Email address"
              />
            </Form.Item>
            <Flex align="center" justify="space-between" gap={16}>
              <Form.Item style={{ flex: 1 }}>
                <Input.Password
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item style={{ flex: 1 }}>
                <Input.Password
                  style={{
                    padding: "16px",
                    borderRadius: token.borderRadiusLG,
                  }}
                  placeholder="Confirmed password"
                />
              </Form.Item>
            </Flex>
            <Form.Item>
              <Flex justify="flex-start">
                <Checkbox style={{ color: token.colorTextSecondary }}>
                  I agree to the <a href="/terms-and-conditions">Term</a> &{" "}
                  <a href="privacy-policy">Privacy</a>
                </Checkbox>
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
        </Flex>
      </Col>
    </AuthContent>
  );
};
