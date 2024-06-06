import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SCS_ADD_CLIENT_URL } from "Config/SCSEndpointConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input, Select, SelectProps, Typography } from "antd";
import axios from "axios";
import { Account } from "features/auth/authSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ClientPermissionOptions: SelectProps["options"] = [
  {
    label: "Read",
    value: "READ",
  },
  {
    label: "Write",
    value: "WRITE",
  },
  {
    label: "Delete",
    value: "DELETE",
  },
];

export const AddClientPage = () => {
  const navigate = useNavigate();

  const account: Account = useSelector((state: any) => state.auth.account);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleAdd = async () => {
    setLoading(true);

    const clientId = form.getFieldValue("clientId");
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
      invitees: [
        ...invitees,
        {
          clientId,
          inviteeEmail: account.email,
          permission: "ADMIN",
        },
      ],
    };
    await axios.post(SCS_ADD_CLIENT_URL, formData);

    setLoading(false);

    navigate("/people");
  };

  return (
    <AppSurface type="form">
      <AppSpace>
        <Typography.Title level={4}>Add a new client</Typography.Title>
        <AppForm form={form} onValuesChange={handleValuesChange}>
          <Form.Item label="Client" name="clientId">
            <Input placeholder="Enter a client name" />
          </Form.Item>
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
                          addonAfter={
                            <Form.Item
                              noStyle
                              name={[field.name, "permissions"]}
                              key={`${field.key}-permissions`}
                            >
                              <Select
                                options={ClientPermissionOptions}
                                placeholder="Permission"
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
          <Form.Item noStyle>
            <AppButton onClick={handleAdd} type="primary" loading={loading}>
              Add
            </AppButton>
          </Form.Item>
        </AppForm>
      </AppSpace>
    </AppSurface>
  );
};
