import { Card, Col, Divider, Flex, Typography, theme } from "antd";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppRow } from "LayoutComponents/AppRow";
import { Fragment } from "react/jsx-runtime";

const headers = [
  {
    label: "Usage",
    align: "flex-start",
  },
  {
    label: "Requests",
    align: "flex-end",
  },
  {
    label: "Est. Cost",
    align: "flex-end",
  },
];

const data = [
  {
    usage: "API Workflows",
    requests: 0,
    cost: "$0.00",
  },
  {
    usage: "Email Notification Workflows",
    requests: 0,
    cost: "$0.00",
  },
  {
    usage: "Metrics",
    requests: 0,
    cost: "$0.00",
  },
  {
    usage: "Storage",
    requests: 0,
    cost: "$0.00",
  },
];

export const BillingPage = () => {
  const { token } = theme.useToken();

  return (
    <AppSpace>
      <PageTitle>Billing</PageTitle>

      <Card
        bordered={false}
        style={{ boxShadow: token.boxShadowSecondary }}
        styles={{
          title: {
            padding: "16px 0",
          },
        }}
        title={
          <Flex justify="space-between" align="flex-start">
            <Typography.Text>Basic plan</Typography.Text>

            <Flex gap={8} vertical align="flex-end">
              <Typography.Text type="secondary">
                May 2024 (Last Invoice)
              </Typography.Text>
              <Typography.Text>$0.00</Typography.Text>
            </Flex>
          </Flex>
        }
      >
        <Flex vertical gap={16}>
          <AppRow gutter={[16, 16]}>
            {headers.map((header, i) => (
              <Col
                span={8}
                key={`${header}-${i}`}
                style={{
                  justifyContent: header.align,
                  display: "flex",
                }}
              >
                <Typography.Text strong>
                  {header.label.toUpperCase()}
                </Typography.Text>
              </Col>
            ))}
            {data.map((item, i) => (
              <Fragment key={i}>
                {Object.entries(item).map(([k, v], j) => (
                  <Col
                    span={8}
                    key={`${k}-${i}-${j}`}
                    style={{
                      justifyContent: headers[j].align,
                      display: "flex",
                    }}
                  >
                    <Typography.Text strong>{v}</Typography.Text>
                  </Col>
                ))}
                <Divider style={{ margin: 0 }} />
              </Fragment>
            ))}
          </AppRow>
          <Flex justify="flex-end">
            <Typography.Text strong>Total: $0.00</Typography.Text>
          </Flex>
        </Flex>
      </Card>
    </AppSpace>
  );
};
