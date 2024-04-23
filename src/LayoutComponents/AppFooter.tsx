import Icon from "@ant-design/icons/lib/components/Icon";
import { FacebookSvg } from "SvgIcons/FacebookSvg";
import { LinkedInSvg } from "SvgIcons/LinkedInSvg";
import { Col, Divider, Flex, Image, Typography, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { AppRow } from "./AppRow";
import { BRAND } from "Config/WOSEndpointConfig";
import { HoveredLink } from "DataEntryComponents/HoveredLink";

export const AppFooter = () => {
  const { token } = theme.useToken();
  return (
    <Footer style={{ padding: "0 16px", marginTop: 16 }}>
      <div
        style={{
          backgroundColor: "blue",
          width: "100%",
          padding: 24,
          borderTopLeftRadius: token.borderRadiusLG,
          borderTopRightRadius: token.borderRadiusLG,
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
              <Typography.Text strong>Support</Typography.Text>
              <Typography.Text>Help</Typography.Text>
              <Typography.Text>Contact</Typography.Text>
            </Flex>
          </Col>
          <Col span={6}>
            <Flex vertical align="flex-start" gap={16}>
              <Typography.Text strong>Company</Typography.Text>
              <Typography.Text>About</Typography.Text>
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
              >{`The Cloud World ©2024`}</Typography.Text>
            </Flex>

            <HoveredLink href="/terms-and-conditions">Terms</HoveredLink>

            <HoveredLink href="/privacy-policy">Privacy</HoveredLink>
          </Flex>

          <Flex align="center" wrap="wrap" gap={12}>
            <a href="https://www.facebook.com/profile.php?id=61558007322573">
              <Icon component={FacebookSvg} style={{ fontSize: 24 }} />
            </a>
            <a href="https://www.linkedin.com/company/101706949">
              <Icon component={LinkedInSvg} style={{ fontSize: 24 }} />
            </a>
          </Flex>
        </Flex>
      </div>
    </Footer>
  );
};
