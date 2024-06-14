import {
  ApiOutlined,
  CreditCardOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Collapse, Flex, Typography, theme } from "antd";
import { cloneElement } from "react";
import { useNavigate } from "react-router-dom";

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

export const SupportPage = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Flex vertical>
      <Flex
        vertical
        style={{
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
      </Flex>

      <AppRow
        gutter={[16, 16]}
        className="cursor-pointer"
        style={{
          justifyContent: "center",
          padding: "64px 128px",
          margin: 0,
        }}
      >
        {topics.map((topic, i) => (
          <Col span={6} key={i} className="flex flex-col">
            <AppCard className="h-full">
              <Flex vertical align="center" gap={16}>
                {cloneElement(topic.icon, {
                  style: { fontSize: 24 },
                })}
                <Typography.Text strong>{topic.label}</Typography.Text>
              </Flex>
            </AppCard>
          </Col>
        ))}
      </AppRow>

      <Flex
        vertical
        justify="center"
        align="center"
        gap={32}
        style={{
          padding: "64px 128px",
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          FAQs
        </Typography.Title>

        <Collapse
          bordered={false}
          style={{ width: "100%" }}
          expandIconPosition="right"
          ghost
          items={[
            {
              key: "1",
              label: (
                <Typography.Text strong>This is panel header 1</Typography.Text>
              ),
              children: <p>Coming soon...</p>,
              style: {},
            },
            {
              key: "2",
              label: (
                <Typography.Text strong>This is panel header 2</Typography.Text>
              ),
              children: <p>Coming soon...</p>,
              style: {},
            },
          ]}
        />
      </Flex>

      <Flex
        style={{
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

        <AppButton type="primary" onClick={() => navigate("/contact")}>
          Contact Us
        </AppButton>
      </Flex>
    </Flex>
  );
};
