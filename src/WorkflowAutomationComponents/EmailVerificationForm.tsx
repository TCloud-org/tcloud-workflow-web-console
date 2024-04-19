import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { Flex, Form, FormListFieldData, Input, Typography } from "antd";
import { ReactNode } from "react";

export const EmailVerificationForm = (props: {
  fields: FormListFieldData[];
  add: (defaultValue?: any, insertIndex?: number | undefined) => void;
  remove: (index: number | number[]) => void;
  errors: ReactNode[];
  value?: any;
  onChange?: () => void;
}) => {
  const { fields, add, remove, errors } = props;

  return (
    <>
      {fields.map((field, index) => (
        <Form.Item
          label={index === 0 ? "Email addresses" : ""}
          required={false}
          key={field.key}
        >
          <Flex align="center" gap={8}>
            <Form.Item
              {...field}
              validateTrigger={["onChange", "onBlur"]}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "Please input email or delete this field.",
                },
              ]}
              noStyle
            >
              <Input placeholder="Enter email address (e.g., example@company.com)" />
            </Form.Item>
            <AppIconButton onClick={() => remove(field.name)}>
              <MinusCircleOutlined />
            </AppIconButton>
          </Flex>
        </Form.Item>
      ))}
      <Form.Item>
        <AppButton type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
          Add email
        </AppButton>
        <Form.ErrorList errors={errors} />
      </Form.Item>
      <Form.Item>
        <Typography.Paragraph strong>
          Upon submission, an email containing verification instructions will be
          promptly sent to the provided email addresses.
        </Typography.Paragraph>
      </Form.Item>
    </>
  );
};
