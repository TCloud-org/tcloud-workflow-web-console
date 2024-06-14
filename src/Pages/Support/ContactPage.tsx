import {
  ArrowRightOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Span } from "Config/DataDisplayInterface";
import { WOS_CONTACT_ME } from "Config/WOSEndpointConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Flex, Form, Input, Row, Typography, message } from "antd";
import axios from "axios";

const contactOptions = [
  {
    icon: <PhoneOutlined />,
    value: "+1 (425) 229-8028",
    href: "tel:+14252298028",
  },
  {
    icon: <MailOutlined />,
    value: "tungdinh@thecloudworlds.com",
    href: "mailto:tungdinh@thecloudworlds.com",
  },
  {
    icon: <EnvironmentOutlined />,
    value: "Bellevue, WA",
    href: "https://www.google.com/maps/search/?api=1&query=47.610378,-122.200676",
  },
];
export const ContactPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleContact = async () => {
    await axios.post(WOS_CONTACT_ME, { ...form.getFieldsValue() });
    messageApi.success("Message sent!");
  };

  return (
    <div
      className="py-6"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {contextHolder}
      <AppRow style={{ height: "100%", flex: 1 }} gutter={[64, 64]}>
        <Col {...Span[2]}>
          <Flex vertical gap={16} align="flex-start">
            <PageTitle className="w-full">Contact us</PageTitle>

            <Typography.Text>
              Any question? We would be happy to help
            </Typography.Text>
            {contactOptions.map((option, i) => (
              <AppCard
                className="cursor-pointer w-full"
                key={i}
                onClick={() => (window.location.href = option.href)}
              >
                <Flex gap={16}>
                  {option.icon}
                  <Typography.Text>{option.value}</Typography.Text>
                </Flex>
              </AppCard>
            ))}
          </Flex>
        </Col>
        <Col {...Span[2]}>
          <AppCard>
            <Flex vertical gap={16}>
              <Typography.Title level={3} style={{ marginTop: 0 }}>
                Get in touch
              </Typography.Title>
              <AppForm
                layout="vertical"
                style={{ width: "100%" }}
                form={form}
                onValuesChange={(_, values) => form.setFieldsValue(values)}
              >
                <Row gutter={[24, 24]}>
                  <Col {...Span[2]}>
                    <Form.Item label="First name" name="firstName">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col {...Span[2]}>
                    <Form.Item label="Last name" name="lastName">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Email address" name="email">
                  <Input />
                </Form.Item>
                <Form.Item label="Message" name="message">
                  <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
                </Form.Item>

                <Form.Item style={{ flex: 1 }}>
                  <AppButton
                    type="primary"
                    style={{ width: "100%" }}
                    icon={<ArrowRightOutlined />}
                    onClick={handleContact}
                  >
                    Submit
                  </AppButton>
                </Form.Item>
              </AppForm>
            </Flex>
          </AppCard>
        </Col>
      </AppRow>
    </div>
  );
};
