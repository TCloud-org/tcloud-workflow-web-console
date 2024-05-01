import {
  EMS_GET_EMAIL_TEMPLATE_PRODUCT_ENDPOINT,
  EMS_REMOVE_EMAIL_TEMPLATE_PRODUCT_ENDPOINT,
  EMS_SAVE_EMAIL_TEMPLATE_PRODUCT_ENDPOINT,
} from "Config/EMSEndpointConfig";
import { EmailTemplateProduct } from "Config/StoreConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppHtmlEditor } from "DataEntryComponents/Form/AppHtmlEditor";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EditEmailTemplatePage = () => {
  const [form] = Form.useForm();
  const { productId } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [template, setTemplate] = useState<EmailTemplateProduct>();

  const fetchEmailTemplate = useCallback(async () => {
    if (productId) {
      setLoading(true);

      const res = await axios
        .get(
          `${EMS_GET_EMAIL_TEMPLATE_PRODUCT_ENDPOINT}?productId=${productId}`
        )
        .then((res) => res.data as EmailTemplateProduct);
      setTemplate(res);
      form.setFieldsValue(res);

      setLoading(false);
    }
  }, [productId, form]);

  useEffect(() => {
    fetchEmailTemplate();
  }, [fetchEmailTemplate]);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleSave = async () => {
    setSaveLoading(true);

    const formData = {
      ...template,
      ...form.getFieldsValue(),
    };

    await axios.post(EMS_SAVE_EMAIL_TEMPLATE_PRODUCT_ENDPOINT, formData);

    setSaveLoading(false);
    window.history.back();
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleRemove = async () => {
    setRemoveLoading(true);

    await axios.delete(
      `${EMS_REMOVE_EMAIL_TEMPLATE_PRODUCT_ENDPOINT}?productId=${template?.templateStoreId}`
    );

    setRemoveLoading(false);
    window.history.back();
  };

  return (
    <AppSpace loading={loading}>
      <PageTitle>{`${template?.name} #${template?.templateStoreId}`}</PageTitle>
      <AppForm
        layout="vertical"
        form={form}
        onValuesChange={handleValuesChange}
        requiredMark="optional"
      >
        <Form.Item label="Name" name="name" required>
          <Input />
        </Form.Item>

        <Form.Item label="Author" name="author" required>
          <Input />
        </Form.Item>

        <Form.Item label="Thumbnail" name="thumbnailUrl">
          <Input />
        </Form.Item>

        <Form.Item label="Raw" name="raw" required>
          <AppHtmlEditor />
        </Form.Item>

        <Form.Item label="Theme" name="theme">
          <AppHtmlEditor />
        </Form.Item>

        <Form.Item label="Preview" name="preview">
          <AppHtmlEditor />
        </Form.Item>

        <Flex justify="flex-end" gap={16}>
          <Form.Item>
            <AppButton onClick={handleCancel}>Cancel</AppButton>
          </Form.Item>
          <Form.Item>
            <AppButton
              type="primary"
              danger
              onClick={handleRemove}
              loading={removeLoading}
            >
              Unpublish
            </AppButton>
          </Form.Item>
          <Form.Item>
            <AppButton
              type="primary"
              onClick={handleSave}
              loading={saveLoading}
            >
              Save
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
