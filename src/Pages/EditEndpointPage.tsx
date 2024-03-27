import { Flex, Form, Input, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EnvironmentOptions,
  ServiceConfiguration,
} from "../Config/WorkflowConfig";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppForm } from "../DataEntryComponents/AppForm";
import { AppSpace } from "../LayoutComponents/AppSpace";
import axios from "axios";
import { WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT } from "../Config/EndpointConfig";

export const EditEndpointPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data as ServiceConfiguration;

  const [formData, setFormData] = useState<{
    [key: string]: string | number | undefined;
  }>({});

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        serviceId: data.serviceId,
        clientId: data.clientId,
        serviceName: data.serviceName,
        baseUrl: data.baseUrl,
        environment: data.environment,
        alias: data.alias,
      }));
    }
  }, [data]);

  const handleFormChange = (e: any) => {
    const value = Object.values(e)[0] as any;
    setFormData((prev) => ({
      ...prev,
      [Object.keys(e)[0]]: value.target.value as string | number | undefined,
    }));
  };

  const handleUpdate = () => {
    setLoading(true);

    axios
      .post(WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT, formData)
      .then((_) => {
        setLoading(false);
        navigate(`/service/${data.serviceName}/${data.serviceId}`);
      })
      .catch((_) => {
        setLoading(false);
      });
  };

  return (
    <AppSpace>
      <Flex justify="center">
        <Typography.Title level={4}>
          Edit your service endpoint
        </Typography.Title>
      </Flex>

      <AppForm onValuesChange={handleFormChange}>
        <Form.Item
          label="Service Id"
          name="serviceId"
          valuePropName="serviceId"
        >
          <Input value={formData["serviceId"]} disabled />
        </Form.Item>

        <Form.Item label="Client Id" name="clientId" valuePropName="clientId">
          <Input value={formData["clientId"]} disabled />
        </Form.Item>

        <Form.Item
          label="Service"
          name="serviceName"
          valuePropName="serviceName"
        >
          <Input value={formData["serviceName"]} disabled />
        </Form.Item>

        <Form.Item
          label="Endpoint"
          name="baseUrl"
          valuePropName=""
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
        <AppButton loading={loading} onClick={handleUpdate} type="primary">
          Update
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
