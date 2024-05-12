import { Flex, Form, Input, Select, Typography } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { EnvironmentOptions } from "../../Config/WorkflowConfig";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getServiceConfigurations } from "../../Network/WorkflowFetch";

export const CreateEndpointPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName } = location?.state || {};

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);

  const [formData, setFormData] = useState<{
    [key: string]: string | number | undefined;
  }>({});
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const configMap =
      ((await getServiceConfigurations(clientId, authToken)) || {})
        .serviceConfigurationMap || {};
    setServices(
      Object.keys(configMap).map((serviceName) => ({
        value: serviceName,
        label: serviceName,
      }))
    );
    setLoading(false);
  }, [clientId, authToken]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, serviceName: serviceName }));
  }, [serviceName]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, clientId }));
  }, [clientId]);

  const handleValuesChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [Object.keys(e)[0]]: Object.values(e)[0] as string | number | undefined,
    }));
  };

  const handleCreate = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .post(WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT, formData, config)
      .then((_) => {
        navigate(`/service/${serviceName}`);
      })
      .catch((error) => console.error(error));
  };

  return (
    <AppSpace loading={loading}>
      <Flex justify="center">
        <Typography.Title level={4}>
          Create a new service endpoint
        </Typography.Title>
      </Flex>

      <AppForm onValuesChange={handleValuesChange}>
        <Form.Item label="Client Id" name="clientId" valuePropName="clientId">
          <Input value={clientId} disabled />
        </Form.Item>

        <Form.Item
          label="Service"
          name="serviceName"
          valuePropName="serviceName"
        >
          <Select
            value={formData["serviceName"]}
            options={services}
            placeholder="Select a service"
          />
        </Form.Item>

        <Form.Item
          label="Endpoint"
          name="baseUrl"
          valuePropName="baseUrl"
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
          valuePropName="environment"
          rules={[{ required: true, message: "Please select an environment" }]}
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
          valuePropName="alias"
          tooltip="If this field is left empty, it will be automatically assigned a generated ID"
        >
          <Input value={formData["alias"]} placeholder="Enter an alias" />
        </Form.Item>
      </AppForm>
      <Flex justify="center">
        <AppButton type="primary" onClick={handleCreate}>
          Create
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
