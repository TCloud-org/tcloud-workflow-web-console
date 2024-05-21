import { Form, Input, Select, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { EnvironmentOptions } from "../../Config/WorkflowConfig";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppSurface } from "DataDisplayComponents/AppSurface";

export const AddServicePage = () => {
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const [formData, setFormData] = useState<{
    [key: string]: string | number | undefined;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (clientId) {
      setFormData((prev) => ({ ...prev, clientId }));
    }
  }, [clientId]);

  const handleValuesChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [Object.keys(e)[0]]: Object.values(e)[0] as string | number | undefined,
    }));
  };

  const handleCreate = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios
      .post(WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT, formData, config)
      .then((_) => {
        navigate(`/service`);
      })
      .catch((_) => {});
    setLoading(false);
  };

  return (
    <AppSurface type="form">
      <AppSpace>
        <Typography.Title level={4}>Add a new service</Typography.Title>

        <AppForm onValuesChange={handleValuesChange}>
          <Form.Item label="Client Id" name="clientId" valuePropName="clientId">
            <Input value={clientId} disabled />
          </Form.Item>

          <Form.Item label="Service" name="serviceName">
            <Input
              value={formData["serviceName"]}
              placeholder="Enter a service name"
            />
          </Form.Item>

          <Form.Item
            label="Endpoint"
            name="baseUrl"
            rules={[
              { required: true, message: "Please enter a service endpoint" },
            ]}
          >
            <Input
              value={formData["baseUrl"]}
              placeholder="Enter a service endpoint"
            />
          </Form.Item>

          <Form.Item
            label="Environment"
            name="environment"
            rules={[
              { required: true, message: "Please select an environment" },
            ]}
          >
            <Select
              value={formData["environment"]}
              options={EnvironmentOptions}
              placeholder="Select an environment"
            />
          </Form.Item>

          <Form.Item
            label="Alias"
            name="alias"
            tooltip="If this field is left empty, it will be automatically assigned a generated ID"
          >
            <Input value={formData["alias"]} placeholder="Enter an alias" />
          </Form.Item>

          <Form.Item noStyle>
            <AppButton loading={loading} type="primary" onClick={handleCreate}>
              Add
            </AppButton>
          </Form.Item>
        </AppForm>
      </AppSpace>
    </AppSurface>
  );
};
