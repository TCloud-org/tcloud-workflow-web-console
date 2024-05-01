import { EMS_SAVE_EMAIL_TEMPLATE_PRODUCT_ENDPOINT } from "Config/EMSEndpointConfig";
import { EmailTemplateProduct } from "Config/StoreConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppHtmlEditor } from "DataEntryComponents/Form/AppHtmlEditor";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PublishProductPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handlePublish = async () => {
    setLoading(true);

    const formData: EmailTemplateProduct = {
      ...form.getFieldsValue(),
    };
    await axios.post(EMS_SAVE_EMAIL_TEMPLATE_PRODUCT_ENDPOINT, formData);

    setLoading(false);

    navigate("/store");
  };

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleCancel = () => {
    navigate("/store");
  };

  return (
    <AppSpace>
      <PageTitle>Publish your template</PageTitle>

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
            <AppButton loading={loading} onClick={handlePublish} type="primary">
              Publish
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
