import { DownloadOutlined, ExportOutlined } from "@ant-design/icons";
import { AMS_GET_PAYMENT_ENDPOINT } from "Config/AMSEndpointConfig";
import { Payment } from "Config/PaymentConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppRow } from "LayoutComponents/AppRow";
import { capitalizeEachWord } from "Utils/StringUtils";
import { Col, Divider, Flex, Result, Typography } from "antd";
import axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const invoices = [
  {
    key: "amountDue",
    label: "Due",
  },
  {
    key: "amountPaid",
    label: "Paid",
  },
  {
    key: "amountRemaining",
    label: "Remain",
  },
];
export const SubscriptionInvoicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const accessToken = useSelector((state: any) => state.auth.token);

  const [payment, setPayment] = useState<Payment>();

  const fetchPayment = useCallback(async () => {
    if (paymentId) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios
        .get(`${AMS_GET_PAYMENT_ENDPOINT}?paymentId=${paymentId}`, config)
        .then((res) => res.data);
      setPayment(res);
    }
  }, [paymentId, accessToken]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  const viewInvoice = () => {
    if (payment?.invoiceUrl) {
      window.open(payment.invoiceUrl, "_blank");
    }
  };

  const downloadInvoice = () => {
    if (payment?.invoicePdf) {
      window.open(payment.invoicePdf, "_blank");
    }
  };

  const renderContent = () => {
    if (success) {
      return (
        <Result
          status="success"
          title="Confirmed"
          subTitle={
            <Typography.Text type="secondary">
              Your transaction reference number is{" "}
              <Typography.Text strong>
                {`${payment?.paymentId}`}
              </Typography.Text>
            </Typography.Text>
          }
          extra={
            <AppButton
              type="primary"
              key="console"
              onClick={() => navigate("/")}
            >
              Explore
            </AppButton>
          }
        />
      );
    }

    if (canceled) {
      return (
        <Result
          status="error"
          title="Failed"
          subTitle="Oops! It looks like your payment didn't go through this time."
          extra={
            <AppButton
              type="primary"
              key="console"
              onClick={() => navigate("/")}
            >
              Back Home
            </AppButton>
          }
        />
      );
    }

    return null;
  };

  return (
    <Flex vertical>
      {renderContent()}
      <Divider />
      {success && (
        <Flex vertical gap={24}>
          <Flex
            justify="space-between"
            align="center"
            style={{ margin: "16px 0" }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              Invoice
            </Typography.Title>

            <Flex gap={16}>
              <AppButton onClick={viewInvoice} icon={<ExportOutlined />}>
                View invoice
              </AppButton>
              <AppButton
                onClick={downloadInvoice}
                type="primary"
                icon={<DownloadOutlined />}
              >
                Download invoice
              </AppButton>
            </Flex>
          </Flex>

          <AppRow gutter={[16, 16]}>
            <Col span={12}>
              <Typography.Text>
                {capitalizeEachWord(
                  payment?.subscriptionPlan.toLowerCase() || ""
                )}{" "}
                Plan
              </Typography.Text>
            </Col>
            <Col span={12}>
              <Flex vertical>
                {invoices.map((invoice, i) => (
                  <Fragment key={i}>
                    <Flex justify="space-between">
                      <Typography.Text>{invoice.label}</Typography.Text>
                      <Typography.Text>
                        ${payment?.[invoice.key as keyof Payment]?.toFixed(2)}
                      </Typography.Text>
                    </Flex>
                    <Divider style={{ margin: "8px 0" }} />
                  </Fragment>
                ))}
              </Flex>
            </Col>
          </AppRow>
        </Flex>
      )}
    </Flex>
  );
};
