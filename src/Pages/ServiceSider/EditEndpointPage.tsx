import { Flex, Form, Input, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EnvironmentOptions,
  ServiceConfiguration,
} from "../../Config/WorkflowConfig";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import axios from "axios";
import { WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { useSelector } from "react-redux";
import { AppSurface } from "DataDisplayComponents/AppSurface";

export const EditEndpointPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data as ServiceConfiguration;
  const [form] = Form.useForm();

  const authToken = useSelector((state: any) => state.auth.token);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        serviceId: data.serviceId,
        clientId: data.clientId,
        serviceName: data.serviceName,
        baseUrl: data.baseUrl,
        environment: data.environment,
        alias: data.alias,
      });
    }
  }, [data, form]);

  const handleFormChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleUpdate = () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .post(
        WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT,
        form.getFieldsValue(),
        config
      )
      .then((_) => {
        setLoading(false);
        navigate(`/service-configuration/${data.serviceName}`);
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

      <AppSurface type="form">
        <AppForm onValuesChange={handleFormChange} form={form}>
          <Form.Item label="Service Id" name="serviceId">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Client Id" name="clientId">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Service" name="serviceName">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Endpoint"
            name="baseUrl"
            rules={[
              { required: true, message: "Please enter a service endpoint" },
            ]}
          >
            <Input placeholder="Enter a service endpoint" />
          </Form.Item>

          <Form.Item
            label="Environment"
            name="environment"
            rules={[
              { required: true, message: "Please select an environment" },
            ]}
          >
            <Select
              options={EnvironmentOptions}
              placeholder="Select an environment"
            />
          </Form.Item>

          <Form.Item
            label="Alias"
            name="alias"
            tooltip="If this field is left empty, it will be automatically assigned a generated ID"
          >
            <Input placeholder="Enter an alias" />
          </Form.Item>
        </AppForm>
        <Flex justify="center">
          <AppButton loading={loading} onClick={handleUpdate} type="primary">
            Update
          </AppButton>
        </Flex>
      </AppSurface>
    </AppSpace>
  );
};
