import {
  ApiOutlined,
  CreditCardOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AppImageWithSource } from "DataDisplayComponents/AppImageWithSource";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Card, Col, Flex, Typography, theme } from "antd";
import { cloneElement } from "react";

const topics = [
  {
    icon: <SettingOutlined />,
    label: "General",
    href: "/support/general",
  },
  {
    icon: <UserOutlined />,
    label: "Account",
    href: "/support/account",
  },
  {
    icon: <ApiOutlined />,
    label: "Integration",
    href: "/support/integration",
  },
  {
    icon: <CreditCardOutlined />,
    label: "Billing",
    href: "/support/billing",
  },
];

const bgColor = "#f3f1ff";

export const SupportPage = () => {
  const { token } = theme.useToken();

  return (
    <Flex vertical>
      <Flex
        vertical
        style={{
          backgroundColor: bgColor,
          borderTopLeftRadius: token.borderRadiusLG,
          borderTopRightRadius: token.borderRadiusLG,
          padding: 64,
        }}
        align="center"
        gap={16}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          Hi! How can we help?
        </Typography.Title>

        <AppSearchInput style={{ width: "50%" }} showFilter={false} />

        <AppImageWithSource
          imageUrl="https://tcw-images.s3.us-west-2.amazonaws.com/2492484-removebg.png"
          resourceUrl="https://www.freepik.com/free-vector/flat-design-call-center-concept_4723736.htm#fromView=search&page=1&position=3&uuid=cfcab6f1-2cb9-425c-ba36-5c6dd50649bc"
          resourceLabel="Image by freepik"
          size={400}
          preview={false}
        />
      </Flex>

      <AppRow
        gutter={[16, 16]}
        style={{
          justifyContent: "center",
          padding: "64px 128px",
          backgroundColor: token.colorFillQuaternary,
          margin: 0,
        }}
      >
        {topics.map((topic, i) => (
          <Col span={6} key={i}>
            <Card hoverable>
              <Flex vertical align="center" gap={16}>
                {cloneElement(topic.icon, {
                  style: { fontSize: 24, color: token.colorPrimary },
                })}
                <Typography.Text strong>{topic.label}</Typography.Text>
              </Flex>
            </Card>
          </Col>
        ))}
      </AppRow>

      <Flex justify="center" style={{ padding: 64 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          FAQs
        </Typography.Title>
      </Flex>

      <Flex
        style={{
          backgroundColor: bgColor,
          borderBottomLeftRadius: token.borderRadiusLG,
          borderBottomRightRadius: token.borderRadiusLG,
          padding: 64,
        }}
        align="center"
        justify="center"
        gap={16}
        vertical
      >
        <Typography.Title level={5} style={{ margin: 0 }}>
          Can't find what you're looking for?
        </Typography.Title>

        <AppButton type="primary">Contact Us</AppButton>
      </Flex>
    </Flex>
  );
};
