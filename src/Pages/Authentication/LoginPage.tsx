import { borderColor } from "Config/AutomationConfig";
import { Span } from "Config/DataDisplayInterface";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Flex, Form, Image, Input, Typography, theme } from "antd";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100vh", width: "100vw", padding: 128 }}
    >
      <AppRow gutter={[32, 32]}>
        <Col span={12}>
          <Flex vertical>
            <Image
              src="https://tcw-images.s3.us-west-2.amazonaws.com/6225958.jpg"
              style={{ borderRadius: token.borderRadiusLG }}
            />
            <Flex justify="flex-start">
              <a
                style={{ fontSize: 12 }}
                href="https://www.freepik.com/free-vector/hand-drawn-illustration-business-planning_20124625.htm#fromView=search&page=3&position=24&uuid=86237bfa-c9e7-4467-92b5-0606a5715ad3"
              >
                Image by freepik
              </a>
            </Flex>
          </Flex>
        </Col>

        <Col span={12}>
          <Flex
            vertical
            align="center"
            gap={16}
            justify="center"
            style={{ height: "100%" }}
          >
            <Flex align="center" gap={16}>
              <Image
                src="https://tcw-icon.s3.us-west-2.amazonaws.com/7.png"
                width={60}
                preview={false}
                style={{
                  animation: "spin 10s linear infinite",
                }}
              />
              <Typography.Title style={{ margin: 0 }} level={4}>
                The Cloud World
              </Typography.Title>
            </Flex>

            <Typography.Title level={1}>Welcome</Typography.Title>
            <AppForm
              size="large"
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
                  }}
                  size="large"
                >
                  Login
                </AppButton>
              </Form.Item>
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
      </AppRow>
    </Flex>
  );
};
