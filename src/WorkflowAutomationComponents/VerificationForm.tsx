import { AutomationContentProps } from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import {
  Checkbox,
  Flex,
  Form,
  Radio,
  SelectProps,
  Typography,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { EmailVerificationForm } from "./EmailVerificationForm";
import { AppButton } from "DataEntryComponents/AppButton";
import axios from "axios";
import { EMS_CREATE_AND_VERIFY_EMAIL_IDENTITY_ENDPOINT } from "Config/EMSEndpointConfig";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";

const InputTypes: SelectProps["options"] = [
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Domain",
    value: "domain",
  },
];
export const VerificationForm = (props: AutomationContentProps) => {
  const { id, data, collect } = props;
  const { token } = theme.useToken();

  const [form] = Form.useForm();

  const [type, setType] = useState<string>("email");
  const [verificationCompleted, setVerificationCompleted] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState<
    Record<string, "successful" | "failed" | undefined>
  >({});

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

  const handleVerify = async () => {
    setLoading(true);

    const emails: string[] = form.getFieldValue("emails") || [];
    await emails.forEach(async (email, i) => {
      setEmailLoading((prev) => ({ ...prev, [email]: true }));
      await setTimeout(async () => {
        await axios
          .post(EMS_CREATE_AND_VERIFY_EMAIL_IDENTITY_ENDPOINT, {
            emailIdentity: email,
          })
          .then((_) => {
            setEmailLoading((prev) => ({ ...prev, [email]: false }));
            setSent((prev) => ({ ...prev, [email]: "successful" }));
          })
          .catch((_) => {
            setEmailLoading((prev) => ({ ...prev, [email]: false }));
            setSent((prev) => ({ ...prev, [email]: "failed" }));
          });
      }, 1000 * (i + 1));
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000 * emails.length);
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
          <Radio.Group
            style={{ display: "flex", gap: "16px" }}
            buttonStyle="solid"
          >
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

        <Flex vertical gap={8}>
          {(form.getFieldValue("emails") || []).map(
            (email: any, i: number) =>
              (sent[email] || emailLoading[email]) && (
                <Flex key={i} align="center" gap={8}>
                  {emailLoading[email] ? (
                    <LoadingOutlined />
                  ) : (
                    <>
                      {sent[email] === "successful" && (
                        <CheckCircleFilled
                          style={{ color: token.colorSuccess }}
                        />
                      )}

                      {sent[email] === "failed" && (
                        <CloseCircleFilled
                          style={{ color: token.colorError }}
                        />
                      )}
                    </>
                  )}

                  <Typography.Text>{`Verification instructions sent to ${email}`}</Typography.Text>
                </Flex>
              )
          )}
        </Flex>

        <Flex justify="flex-end">
          <Form.Item>
            <AppButton loading={loading} onClick={handleVerify} type="primary">
              Verify
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
