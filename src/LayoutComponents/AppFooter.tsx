import { Span } from "Config/DataDisplayInterface";
import { HoveredLink } from "DataEntryComponents/HoveredLink";
import { Col, Flex, Image, Row, Typography, theme } from "antd";
import { Footer } from "antd/es/layout/layout";

export const AppFooter = () => {
  const { token } = theme.useToken();
  return (
    <Footer
      style={{
        padding: 0,
        backgroundColor: token.colorBgContainer,
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
        <Row gutter={[16, 16]}>
          <Col {...Span[2]}>
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
          </Col>

          <Col {...Span[2]} className="flex flex-col items-end">
            <Flex align="center" gap={32}>
              <HoveredLink href="https://thecloudworld.supahub.com/b/feedback">
                Submit feedbacks
              </HoveredLink>

              <HoveredLink href="https://thecloudworld.supahub.com/b/support-tickets">
                Report bugs
              </HoveredLink>
            </Flex>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};
