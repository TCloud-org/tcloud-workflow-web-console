import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";
import { BRAND } from "Config/WOSEndpointConfig";
import { HoveredLink } from "DataEntryComponents/HoveredLink";
import { Col, Divider, Flex, Image, Typography, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { AppRow } from "./AppRow";
import { background } from "App";

export const AppFooter = () => {
  const { token } = theme.useToken();
  return (
    <Footer
      style={{
        padding: 0,
        backgroundColor: background,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div
        style={{
          width: "100%",
          padding: 24,
          background: token.colorBgContainer,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        <AppRow gutter={[16, 16]}>
          <Col span={6}>
            <Typography.Title style={{ margin: 0 }} level={4}>
              {BRAND}
            </Typography.Title>
          </Col>
          <Col span={6}>
            <Flex vertical align="flex-start" gap={16}>
              <Typography.Text strong>Product</Typography.Text>
              <Typography.Text>Automation</Typography.Text>
              <Typography.Text>Cloud Infrastructure</Typography.Text>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex vertical align="flex-start" gap={16}>
              <Typography.Text strong>Help Center</Typography.Text>
              <HoveredLink href="/support">Support</HoveredLink>
              <HoveredLink href="/contact">Contact</HoveredLink>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex vertical align="flex-start" gap={16}>
              <Typography.Text strong>Company</Typography.Text>
              <HoveredLink href="/about">About</HoveredLink>
            </Flex>
          </Col>
        </AppRow>
        <Divider />
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={32}>
            <Flex align="center" gap={8}>
              <Image
                src="https://tcw-icon.s3.us-west-2.amazonaws.com/7.png"
                width={24}
                preview={false}
              />
              <Typography.Text
                style={{ fontSize: 12 }}
              >{`The Cloud World ©${new Date().getFullYear()}`}</Typography.Text>
            </Flex>

            <HoveredLink href="/terms-and-conditions">Terms</HoveredLink>

            <HoveredLink href="/privacy-policy">Privacy</HoveredLink>
          </Flex>

          <Flex align="center" wrap="wrap" gap={12}>
            <a href="https://www.facebook.com/profile.php?id=61558007322573">
              <FacebookFilled style={{ fontSize: 24 }} />
            </a>
            <a href="https://www.linkedin.com/company/101706949">
              <LinkedinFilled style={{ fontSize: 24 }} />
            </a>
          </Flex>
        </Flex>
      </div>
    </Footer>
  );
};
