import {
  CloudUploadOutlined,
  CodeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppHtmlEditor } from "DataEntryComponents/Form/AppHtmlEditor";
import { AppHtmlInjection } from "DataEntryComponents/Form/AppHtmlInjection";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Tabs, Typography } from "antd";

export const HtmlEditorWithPreview = (props: { disabled?: boolean }) => {
  return (
    <AppSpace>
      <AppButton type="primary" icon={<SearchOutlined />}>
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
  );
};
