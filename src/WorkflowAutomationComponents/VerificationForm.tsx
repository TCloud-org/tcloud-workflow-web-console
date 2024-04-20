import { AutomationContentProps } from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Checkbox, Form, Radio, SelectProps, Typography } from "antd";
import { useEffect, useState } from "react";
import { EmailVerificationForm } from "./EmailVerificationForm";

const InputTypes: SelectProps["options"] = [
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Domain",
    value: "domain",
    disabled: true,
  },
];
export const VerificationForm = (props: AutomationContentProps) => {
  const { id, data, collect } = props;

  const [form] = Form.useForm();

  const [type, setType] = useState<string>("email");
  const [verificationCompleted, setVerificationCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    if (data && data[id]?.verification) {
      form.setFieldsValue(data[id].verification);
      setType(data[id].verification?.type || "email");
    } else {
      form.setFieldValue("type", "email");
      setType("email");
      collect({
        ...data,
        [id]: {
          verification: form.getFieldsValue(),
        },
      });
    }
  }, [form, data, id, collect]);

  const handleValuesChange = (changes: any, values: any) => {
    if (changes.type) {
      setType(changes.type);
    }
    form.setFieldsValue(values);
    collect({
      ...data,
      [id]: {
        verification: values,
      },
    });
  };

  return (
    <AppSpace>
      <Typography.Paragraph>
        Ensure that all sender domains, including the respective subdomains, and
        email addresses intended for use within this workflow are added and
        verified. Verification of these identities is essential prior to the
        utilization for email transmission purposes.
      </Typography.Paragraph>
      <Checkbox
        checked={verificationCompleted}
        onChange={(e) => setVerificationCompleted(e.target.checked)}
      >
        Check this box if you have completed all the required verifications.
      </Checkbox>
      <AppForm
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        disabled={verificationCompleted}
      >
        <Form.Item name="type">
          <Radio.Group style={{ display: "flex", gap: "16px" }}>
            {InputTypes.map((inputType, i) => (
              <Radio.Button
                value={inputType.value}
                style={{ flex: 1 }}
                key={i}
                disabled={inputType.disabled}
              >
                {inputType.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.List name="emails">
          {(fields, { add, remove }, { errors }) =>
            type === "email" ? (
              <EmailVerificationForm
                add={add}
                fields={fields}
                remove={remove}
                errors={errors}
              />
            ) : (
              <Typography.Text>Coming soon...</Typography.Text>
            )
          }
        </Form.List>
      </AppForm>
    </AppSpace>
  );
};