import Icon from "@ant-design/icons/lib/components/Icon";
import { FacebookSvg } from "SvgIcons/FacebookSvg";
import { LinkedInSvg } from "SvgIcons/LinkedInSvg";
import { Flex, Image, Typography, theme } from "antd";
import { Footer } from "antd/es/layout/layout";

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
        }}
      >
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={32}>
            <Flex align="center" gap={8}>
              <Image
                src="https://tcw-icon.s3.us-west-2.amazonaws.com/7.png"
                width={24}
                preview={false}
              />
              <Typography.Text>{`The Cloud World ©2024`}</Typography.Text>
            </Flex>
            <a href="/terms-and-conditions">Terms</a>
            <a href="/privacy-policy">Privacy</a>
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
