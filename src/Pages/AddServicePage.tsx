import { Flex, Form, Input, Select, Typography } from "antd";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppForm } from "../DataEntryComponents/AppForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT } from "../Config/EndpointConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EnvironmentOptions } from "../Config/WorkflowConfig";
import { AppButton } from "../DataEntryComponents/AppButton";

export const AddServicePage = () => {
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);

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
    await axios
      .post(WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT, formData)
      .then((_) => {
        navigate(`/service`);
      })
      .catch((_) => {});
    setLoading(false);
  };

  return (
    <AppSpace>
      <Flex justify="center">
        <Typography.Title level={4}>Add a new service</Typography.Title>
      </Flex>

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
          tooltip="If this field is left empty, it will be automatically assigned a generated ID"
        >
          <Input value={formData["alias"]} placeholder="Enter an alias" />
        </Form.Item>
      </AppForm>
      <Flex justify="center">
        <AppButton loading={loading} type="primary" onClick={handleCreate}>
          Add
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
