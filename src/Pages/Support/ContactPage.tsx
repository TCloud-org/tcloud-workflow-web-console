import {
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
    <>
      {contextHolder}
      <Row gutter={[0, 64]} className="w-full">
        <Col {...Span[1]}>
          <div className="flex flex-col gap-4">
            <PageTitle className="w-full">Contact us</PageTitle>

            <Typography.Text>
              Any question? We would be happy to help
            </Typography.Text>

            <Row gutter={[16, 16]}>
              {contactOptions.map((option, i) => (
                <Col key={i} {...Span[3]} className="flex flex-col">
                  <AppCard
                    className="cursor-pointer h-full"
                    key={i}
                    onClick={() => (window.location.href = option.href)}
                  >
                    <Flex gap={16} vertical>
                      {option.icon}
                      <Typography.Text>{option.value}</Typography.Text>
                    </Flex>
                  </AppCard>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
        <Col {...Span[1]}>
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

              <Form.Item style={{ flex: 1 }} noStyle>
                <AppButton
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={handleContact}
                >
                  Submit
                </AppButton>
              </Form.Item>
            </AppForm>
          </Flex>
        </Col>
      </Row>
    </>
  );
};
