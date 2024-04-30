import { ArrowRightOutlined } from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Input, Typography } from "antd";

export const ContactPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{ height: "100%", flex: 1 }}
        gap={32}
      >
        <div style={{ flex: 1 }}></div>
        <Flex vertical style={{ flex: 1, width: "100%" }} gap={16}>
          <Typography.Title level={3}>Contact us</Typography.Title>
          <AppForm layout="vertical" style={{ width: "100%" }}>
            <Flex align="center" gap={16}>
              <Form.Item
                style={{ flex: 1 }}
                label="First name"
                name="firstName"
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ flex: 1 }} label="Last name" name="lastName">
                <Input />
              </Form.Item>
            </Flex>
            <Form.Item label="Email address" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Message" name="message">
              <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
            </Form.Item>

            <Flex>
              <Form.Item style={{ flex: 1 }}>
                <AppButton
                  type="primary"
                  style={{ width: "100%" }}
                  icon={<ArrowRightOutlined />}
                >
                  Submit
                </AppButton>
              </Form.Item>
            </Flex>
          </AppForm>
        </Flex>
      </Flex>
    </div>
  );
};
