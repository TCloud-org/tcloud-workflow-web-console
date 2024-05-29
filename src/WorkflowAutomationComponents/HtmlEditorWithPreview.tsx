import {
  CloudUploadOutlined,
  CodeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { EmailTemplateProduct } from "Config/StoreConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppHtmlEditor } from "DataEntryComponents/Form/AppHtmlEditor";
import { AppHtmlInjection } from "DataEntryComponents/Form/AppHtmlInjection";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EmailTemplateStore } from "Pages/Shop/EmailTemplateStore";
import { Flex, Form, Modal, Tabs, Typography } from "antd";
import { useState } from "react";

export const HtmlEditorWithPreview = (props: {
  disabled?: boolean;
  value?: string;
  onChange?: (e: any) => void;
}) => {
  const { onChange, value } = props;

  const [isStoreModalOpen, setIsStoreModalOpen] = useState<boolean>(false);

  const handleUse = (product: EmailTemplateProduct) => {
    if (typeof onChange === "function") {
      onChange({ html: product.raw });
    }
    setIsStoreModalOpen(false);
  };

  return (
    <>
      <AppSpace>
        <AppButton
          type="primary"
          icon={<SearchOutlined />}
          onClick={() => setIsStoreModalOpen(true)}
        >
          Browse email template
        </AppButton>
        <Tabs
          items={[
            //   {
            //     key: "textEditor",
            //     label: (
            //       <Flex align="center" gap={8}>
            //         <FileWordOutlined style={{ margin: 0 }} />
            //         <Typography.Text>Text Editor</Typography.Text>
            //       </Flex>
            //     ),
            //     children: (
            //       <Form.Item name={["message", "text"]}>
            //         <AppRichTextEditor />
            //       </Form.Item>
            //     ),
            //   },
            {
              key: "htmlEditor",
              label: (
                <Flex align="center" gap={8}>
                  <CodeOutlined style={{ margin: 0 }} />
                  <Typography.Text>HTML Editor</Typography.Text>
                </Flex>
              ),
              children: (
                <Form.Item name={["message", "html"]}>
                  <AppHtmlEditor disabled={props.disabled} />
                </Form.Item>
              ),
            },
            {
              key: "htmlInjection",
              label: (
                <Flex align="center" gap={8}>
                  <CloudUploadOutlined style={{ margin: 0 }} />
                  <Typography.Text>HTML Injection</Typography.Text>
                </Flex>
              ),
              children: (
                <Form.Item name={["message", "htmlFile"]}>
                  <AppHtmlInjection />
                </Form.Item>
              ),
            },
          ]}
        />
      </AppSpace>
      <Modal
        title="Store"
        centered
        open={isStoreModalOpen}
        styles={{
          content: {
            height: "90vh",
          },
        }}
        width="100%"
        onCancel={() => setIsStoreModalOpen(false)}
        okButtonProps={{
          style: { display: "none" },
        }}
        cancelButtonProps={{
          style: { display: "none" },
        }}
      >
        <EmailTemplateStore use={handleUse} />
      </Modal>
    </>
  );
};
