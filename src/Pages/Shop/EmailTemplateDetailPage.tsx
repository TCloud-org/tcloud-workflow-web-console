import { RedoOutlined } from "@ant-design/icons";
import { EMS_GET_EMAIL_TEMPLATE_PRODUCT_ENDPOINT } from "Config/EMSEndpointConfig";
import { EmailTemplateProduct } from "Config/StoreConfig";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppColorPicker } from "DataEntryComponents/Form/AppColorPicker";
import { AppSpace } from "LayoutComponents/AppSpace";
import {
  extractKeywordsFromString,
  replacePlaceholders,
} from "Utils/StringUtils";
import { Flex, Form, Input, Tabs, Typography, theme } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";

export const EmailTemplateDetailPage = () => {
  const { token } = theme.useToken();
  const { productId } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [template, setTemplate] = useState<EmailTemplateProduct>();
  const [tryToken, setTryToken] = useState<string | undefined>(undefined);
  const [themeColor, setThemeColor] = useState<string>(token.colorPrimary);

  const fetchEmailTemplate = useCallback(async () => {
    if (productId) {
      setLoading(true);

      const res = await axios
        .get(
          `${EMS_GET_EMAIL_TEMPLATE_PRODUCT_ENDPOINT}?productId=${productId}`
        )
        .then((res) => res.data as EmailTemplateProduct);
      setTemplate(res);

      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchEmailTemplate();
  }, [fetchEmailTemplate]);

  if (!template) {
    return <AppEmpty />;
  }

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleTry = () => {
    setTryToken(v4());
  };

  return (
    <AppSpace loading={loading}>
      <PageTitle>{`${template.name} #${template.templateStoreId}`}</PageTitle>

      <Typography.Title level={4}>Template</Typography.Title>
      <Tabs
        items={[
          {
            key: "raw",
            label: "Raw",
            children: (
              <div
                dangerouslySetInnerHTML={{
                  __html: replacePlaceholders(template.theme || "", {
                    themeColor,
                  }),
                }}
              />
            ),
          },
          {
            key: "preview",
            label: "Preview",
            disabled: template.preview === undefined,
            children: (
              <div
                dangerouslySetInnerHTML={{
                  __html: template.preview ? template.preview : "",
                }}
              />
            ),
          },
        ]}
      />

      <Typography.Title level={4}>Customize theme</Typography.Title>
      <AppColorPicker
        value={themeColor}
        onChange={(e) =>
          setThemeColor(
            `rgba(${e.metaColor.r}, ${e.metaColor.g}, ${e.metaColor.b}, ${e.metaColor.a})`
          )
        }
      />
      <AppButton size="small" onClick={() => setThemeColor(token.colorPrimary)}>
        Reset to default
      </AppButton>

      <Typography.Title level={4}>Try with your input</Typography.Title>
      <AppForm form={form} onValuesChange={handleValuesChange}>
        {extractKeywordsFromString(template.raw).map((word, i) => (
          <Form.Item key={i} name={word} label={word}>
            <Input />
          </Form.Item>
        ))}
        <Flex justify="center">
          <Form.Item>
            <AppButton type="primary" onClick={handleTry}>
              Try now
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>

      {tryToken && (
        <div
          dangerouslySetInnerHTML={{
            __html: replacePlaceholders(template.theme || "", {
              ...form.getFieldsValue(),
              themeColor,
            }),
          }}
        />
      )}
    </AppSpace>
  );
};
