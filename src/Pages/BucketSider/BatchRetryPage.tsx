import { AppSurface } from "DataDisplayComponents/AppSurface";
import { Col, Form, Input, Select, Steps, Typography } from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItem } from "../../Config/DataDisplayInterface";
import { WOS_RETRY_WORKFLOW_ENDPOINT } from "../../Config/WOSEndpointConfig";
import {
  Configuration,
  Route,
  ServiceConfiguration,
} from "../../Config/WorkflowConfig";
import { AppHeading } from "../../DataDisplayComponents/AppHeading";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppRow } from "../../LayoutComponents/AppRow";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";
import { getConfigurationsByService } from "../../Network/WorkflowFetch";

export const BatchRetryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    workIds = [],
    route,
    bucketId,
  }: { workIds: Key[]; route: Route; bucketId: string } = location.state || {};
  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [form] = Form.useForm();

  const [current, setCurrent] = useState<number>(0);
  const [configs, setConfigs] = useState<ServiceConfiguration[]>([]);
  const [config, setConfig] = useState<ServiceConfiguration>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchConfigurations = useCallback(async () => {
    const data = await getConfigurationsByService(route.service, authToken);
    const configs = data?.configurations || [];
    setConfigs(configs);
    setConfig(configs.find((config) => config.alias === "live"));
  }, [route, authToken]);

  useEffect(() => {
    fetchConfigurations();
  }, [fetchConfigurations]);

  useEffect(() => {
    if (config) {
      form.setFieldsValue({
        state: route.source,
        serviceName: config.serviceName,
        baseUrl: configs.find((item) => item.alias === config.alias)?.baseUrl,
        alias: config.alias,
      });
    }
  }, [config, route, form, configs]);

  const handleValuesChange = (event: any) => {
    const alias = event.alias;
    if (alias) {
      const baseUrl = configs.find((item) => item.alias === alias)?.baseUrl;
      form.setFieldsValue({
        baseUrl,
        ...event,
      });
    } else {
      form.setFieldsValue(event);
    }
  };

  const handleBatchRetry = async () => {
    setLoading(true);

    const request = {
      clientId,
      workflowId,
      workIds,
      configuration: {
        stateEndpointConfigMap: {
          [form.getFieldValue("state")]: {
            name: form.getFieldValue("state"),
            alias: form.getFieldValue("alias"),
          } as Configuration,
        },
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios.post(WOS_RETRY_WORKFLOW_ENDPOINT, request, config);

    setLoading(false);
    navigate("/bucket");
  };

  return (
    <AppSurface type="form">
      <AppSpace>
        <Steps
          current={current}
          onChange={setCurrent}
          direction="vertical"
          size="small"
          items={[
            {
              title: <AppHeading>1. Review Batch</AppHeading>,
              description: (
                <AppVerticalStepContent>
                  <AppList
                    header={bucketId}
                    data={workIds.map(
                      (workId) =>
                        ({
                          title: workId,
                          href: `/live/${workId}`,
                        } as ListItem)
                    )}
                  />
                </AppVerticalStepContent>
              ),
            },
            {
              title: (
                <Typography.Text strong>
                  2. Configure Service Endpoint
                </Typography.Text>
              ),
              description: (
                <AppVerticalStepContent>
                  <AppForm form={form} onValuesChange={handleValuesChange}>
                    <AppRow>
                      <Col span={12}>
                        <Form.Item name="state" label="State">
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="serviceName" label="Service">
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="baseUrl" label="Endpoint">
                          <Input disabled />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="alias" label="Alias">
                          <Select
                            options={configs.map((config) => ({
                              label: config.alias,
                              value: config.alias,
                            }))}
                          />
                        </Form.Item>
                      </Col>
                    </AppRow>
                  </AppForm>
                </AppVerticalStepContent>
              ),
            },
          ]}
        />

        <AppButton
          size="small"
          tooltip={`Retry a batch of ${workIds.length} items`}
          type="primary"
          onClick={handleBatchRetry}
          loading={loading}
        >
          Batch Retry
        </AppButton>
      </AppSpace>
    </AppSurface>
  );
};
