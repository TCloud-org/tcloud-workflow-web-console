import {
  Flex,
  Form,
  Input,
  Select,
  SelectProps,
  Typography,
  theme,
} from "antd";
import axios from "axios";
import { createElement, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthenticationTypes } from "../../Config/AuthConfig";
import { GENERATED_ID_INPUT_TOOLTIP } from "../../Config/DataDisplayInterface";
import { SCS_ADD_AUTH_TOKEN_URL } from "../../Config/SCSEndpointConfig";
import { AppTag } from "../../DataDisplayComponents/AppTag";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getServiceConfigurations } from "../../Network/WorkflowFetch";
import { AppSurface } from "DataDisplayComponents/AppSurface";

export const AddTokenPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { token } = theme.useToken();

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);

  const [inputs, setInputs] = useState<any[]>([]);
  const [services, setServices] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    if (clientId) {
      setLoading(true);
      const serviceConfigurations = await getServiceConfigurations(
        clientId,
        authToken
      );
      const serviceConfigMap =
        serviceConfigurations?.serviceConfigurationMap || {};
      setServices(
        Object.keys(serviceConfigMap).map((service) => ({
          label: service,
          value: service,
        }))
      );
      form.setFieldsValue({
        clientId,
      });
      setLoading(false);
    }
  }, [clientId, form, authToken]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    form.setFieldsValue({
      type: AuthenticationTypes.NO_AUTH.type,
    });

    setInputs(AuthenticationTypes.NO_AUTH.inputs);
  }, [form]);

  const handleValuesChange = (e: any) => {
    const type = e.type;
    if (type) {
      setInputs(
        AuthenticationTypes[type as keyof typeof AuthenticationTypes]?.inputs
      );
    }
    form.setFieldsValue(e);
  };

  const handleAdd = async () => {
    setAddLoading(true);

    const params = {
      authToken: {
        ...form.getFieldsValue(),
      },
    };

    await axios
      .post(SCS_ADD_AUTH_TOKEN_URL, params)
      .then((_) => {})
      .catch((err) => console.error(err));

    setAddLoading(false);
    navigate("/authentication");
  };

  return (
    <AppSurface type="form">
      <AppSpace loading={loading}>
        <AppForm form={form} onValuesChange={handleValuesChange}>
          <Form.Item
            name="name"
            label="Name"
            tooltip={GENERATED_ID_INPUT_TOOLTIP}
          >
            <Input placeholder="Enter a name" />
          </Form.Item>
          <Form.Item name="clientId" label="Client">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="service"
            label="Associated service"
            rules={[{ required: true }]}
            tooltip="Select the service you wish to authenticate with"
          >
            <Select options={services} placeholder="Select a service" />
          </Form.Item>
          <Form.Item name="type" label="Authentication type">
            <Select
              placeholder="Select an authentication type"
              options={Object.entries(AuthenticationTypes).map(
                ([type, value]) => ({
                  label: (
                    <AppSpace direction="horizontal">
                      <Typography.Text
                        style={{
                          color: value.disabled
                            ? token.colorTextDisabled
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
                              ? token.colorTextDisabled
                              : undefined,
                            lineHeight: "16px",
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

          <Flex justify="center">
            <Form.Item style={{ marginBottom: 0 }}>
              <AppButton
                loading={addLoading}
                onClick={handleAdd}
                type="primary"
              >
                Add
              </AppButton>
            </Form.Item>
          </Flex>
        </AppForm>
      </AppSpace>
    </AppSurface>
  );
};
