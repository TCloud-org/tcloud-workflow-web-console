import { Flex, Form, Input, Select, Typography, theme } from "antd";
import axios from "axios";
import { createElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthToken, AuthenticationTypes } from "../../Config/AuthConfig";
import { GENERATED_ID_INPUT_TOOLTIP } from "../../Config/DataDisplayInterface";
import { SCS_ADD_AUTH_TOKEN_URL } from "../../Config/SCSEndpointConfig";
import { AppTag } from "../../DataDisplayComponents/AppTag";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";

export const EditTokenPage = () => {
  const navigate = useNavigate();
  const { token: themeToken } = theme.useToken();
  const location = useLocation();
  const { token }: { token: AuthToken } = location.state || {};
  const [form] = Form.useForm();

  const [inputs, setInputs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      form.setFieldsValue({
        ...token,
      });
      setInputs(
        AuthenticationTypes[token.type as keyof typeof AuthenticationTypes]
          ?.inputs
      );
    }
  }, [form, token]);

  const handleValuesChange = (e: any) => {
    const type = e.type;
    if (type) {
      setInputs(
        AuthenticationTypes[type as keyof typeof AuthenticationTypes]?.inputs
      );
    }
    form.setFieldsValue(e);
  };

  const handleEdit = async () => {
    setLoading(true);

    const params = {
      authToken: {
        ...form.getFieldsValue(),
      },
    };

    await axios
      .post(SCS_ADD_AUTH_TOKEN_URL, params)
      .then((_) => {})
      .catch((err) => console.error(err));

    setLoading(false);
    navigate(`/auth-token/${token.tokenId}`);
  };

  return (
    <AppSpace>
      <AppForm form={form} onValuesChange={handleValuesChange}>
        <Form.Item
          name="name"
          label="Name"
          tooltip={GENERATED_ID_INPUT_TOOLTIP}
        >
          <Input />
        </Form.Item>
        <Form.Item name="clientId" label="Client">
          <Input disabled />
        </Form.Item>
        <Form.Item name="service" label="Service">
          <Input disabled />
        </Form.Item>
        <Form.Item name="type" label="Authentication Type">
          <Select
            placeholder="Select an authentication type"
            options={Object.entries(AuthenticationTypes).map(
              ([type, value]) => ({
                label: (
                  <AppSpace direction="horizontal" size="small">
                    <Typography.Text
                      style={{
                        color: value.disabled
                          ? themeToken.colorTextDisabled
                          : undefined,
                      }}
                    >
                      {value.label}
                    </Typography.Text>
                    {value.tag && (
                      <AppTag
                        {...value.tag}
                        style={{
                          color: value.disabled
                            ? themeToken.colorTextDisabled
                            : undefined,
                        }}
                      />
                    )}
                  </AppSpace>
                ),
                value: type,
                disabled: value.disabled,
              })
            )}
          />
        </Form.Item>
        {inputs.map((input: any, i: number) => (
          <Form.Item
            key={i}
            name={input.name}
            label={input.label}
            rules={[{ required: input.required }]}
          >
            {createElement(input.element, input.props)}
          </Form.Item>
        ))}
      </AppForm>
      <Flex justify="center">
        <AppButton loading={loading} onClick={handleEdit} type="primary">
          Edit
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
