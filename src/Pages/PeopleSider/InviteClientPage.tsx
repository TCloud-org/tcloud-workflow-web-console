import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input, Select, Typography } from "antd";
import { useState } from "react";
import { ClientPermissionOptions } from "./AddClientPage";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Account } from "features/auth/authSlice";
import axios from "axios";
import { SCS_INVITE_TO_ORG_URL } from "Config/SCSEndpointConfig";

export const InviteClientPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { clientId } = useParams();
  const account: Account = useSelector((state: any) => state.auth.account);

  const [loading, setLoading] = useState<boolean>(false);

  const handleInvite = async () => {
    setLoading(true);
    const invitees: any[] = (form.getFieldValue("invitees") || [])
      .filter((invitee: any) => invitee.email !== account.email)
      .flatMap((invitee: any) =>
        (invitee?.permissions || []).map((permission: string) => ({
          clientId,
          inviteeEmail: invitee.email,
          permission,
        }))
      );
    const formData = {
      client: {
        clientId,
        email: account.email,
      },
      invitees: invitees,
    };
    await axios.post(SCS_INVITE_TO_ORG_URL, formData);
    setLoading(false);

    navigate(`/client/${clientId}`);
  };

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  return (
    <AppSpace>
      <Flex justify="center">
        <Typography.Title level={4}>Invite contributor</Typography.Title>
      </Flex>

      <AppForm form={form} onValuesChange={handleValuesChange}>
        <Form.List name="invitees">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  label={index === 0 ? "Invitees" : " "}
                  required={false}
                  key={field.key}
                >
                  <Flex align="center" gap={8}>
                    <Form.Item
                      {...field}
                      name={[field.name, "email"]}
                      validateTrigger={["onChange"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input invitee's email address or remove this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Invitee's email address"
                        size="small"
                        addonAfter={
                          <Form.Item
                            noStyle
                            name={[field.name, "permissions"]}
                            key={`${field.key}-permissions`}
                          >
                            <Select
                              options={ClientPermissionOptions}
                              placeholder="Permission"
                              size="small"
                              style={{
                                width: 250,
                              }}
                              mode="multiple"
                              variant="borderless"
                              allowClear
                              maxTagCount={2}
                            />
                          </Form.Item>
                        }
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  </Flex>
                </Form.Item>
              ))}
              <Form.Item label={fields.length === 0 ? "Invitees" : " "}>
                <AppButton
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: "100%" }}
                  icon={<PlusOutlined />}
                >
                  Add invitee
                </AppButton>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Flex justify="center">
          <Form.Item>
            <AppButton onClick={handleInvite} type="primary" loading={loading}>
              Invite
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
