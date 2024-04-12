import { Span } from "Config/DataDisplayInterface";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppRichTextEditor } from "DataEntryComponents/AppRichTextEditor";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input } from "antd";

export const EmailTemplateForm = () => {
  return (
    <AppSpace>
      <AppForm layout="vertical" wrapperCol={Span[1]}>
        <Form.Item label="From" name="from">
          <Input />
        </Form.Item>
        <Form.Item label="To" name="to">
          <Input />
        </Form.Item>
        <Form.Item label="Cc" name="cc">
          <Input />
        </Form.Item>
        <Form.Item label="Bcc" name="bcc">
          <Input />
        </Form.Item>
        <Form.Item label="Subject" name="subject">
          <Input />
        </Form.Item>
        <Form.Item label="Message" name="message">
          <AppRichTextEditor />
        </Form.Item>
        <Form.Item>
          <Flex justify="flex-end">
            <AppButton type="primary">Save</AppButton>
          </Flex>
        </Form.Item>
      </AppForm>
    </AppSpace>
  );
};
