import { GraphState } from "WorkflowComponents/GraphBuilder";
import { Col, Form, FormInstance, Input, Select } from "antd";
import { useCallback, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { ServiceConfiguration } from "../../Config/WorkflowConfig";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppRow } from "../../LayoutComponents/AppRow";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";
import { createSpan } from "Config/DataDisplayInterface";

export const BatchRerunConfigureEndpointStep = (props: {
  form: FormInstance<any>;
  type?: string;
  services?: string[];
  states?: GraphState[];
  serviceConfigMap?: {
    [service: string]: ServiceConfiguration[];
  };
}) => {
  const {
    form,
    services = [],
    type,
    serviceConfigMap = {},
    states = [],
  } = props;

  const setServiceFieldsFromConfig = useCallback(
    (config?: ServiceConfiguration) => {
      if (!config || !type || type !== "service") {
        return;
      }

      form.setFieldsValue({
        [type]: {
          ...form.getFieldValue(type),
          [config.serviceName]: {
            serviceName: config.serviceName,
            baseUrl: config.baseUrl,
            alias: config.alias,
          },
        },
      });
    },
    [form, type]
  );

  const setStateFieldsFromConfig = useCallback(
    (state: GraphState, config?: ServiceConfiguration) => {
      if (!config || !type || type !== "state") {
        return;
      }

      form.setFieldsValue({
        [type]: {
          ...form.getFieldValue(type),
          [state.name as string]: {
            source: state.name,
            serviceName: config.serviceName,
            baseUrl: config.baseUrl,
            alias: config.alias,
          },
        },
      });
    },
    [form, type]
  );

  useEffect(() => {
    if (Object.keys(serviceConfigMap).length > 0) {
      services
        .filter((service) => service)
        .forEach((service: string) => {
          const config = serviceConfigMap[service].find(
            (item) => item.alias === "live"
          );

          setServiceFieldsFromConfig(config);
        });

      states
        .filter((state) => state.service)
        .forEach((state) => {
          const config = serviceConfigMap[state.service as string].find(
            (item) => item.alias === "live"
          );

          setStateFieldsFromConfig(state, config);
        });
    }
  }, [
    services,
    form,
    serviceConfigMap,
    setServiceFieldsFromConfig,
    states,
    setStateFieldsFromConfig,
    type,
  ]);
  const handleServiceValuesChange = (e: {
    [key: string]: { [key: string]: any };
  }) => {
    if (!type || !e[type]) return;

    const [service, data] = Object.entries(e[type])[0];
    const alias = data.alias;
    if (alias && service) {
      const config = serviceConfigMap[service.toString()].find(
        (item) => item.alias === alias
      );
      setServiceFieldsFromConfig(config);
    }
  };

  const handleStateValuesChange = (e: {
    [key: string]: { [key: string]: any };
  }) => {
    if (!type || !e[type]) return;

    const [source, data] = Object.entries(e[type])[0];
    const alias = data.alias;
    if (alias) {
      const state = states
        .filter((state) => state.service)
        .find((state) => state.name === source);
      if (!state) return;

      const config = serviceConfigMap[state.service as string].find(
        (item) => item.alias === alias
      );

      setStateFieldsFromConfig(state, config);
    }
  };

  const renderContent = () => {
    if (!type) {
      return null;
    }
    if (type === "state") {
      return states
        .filter((state) => state.service)
        .map((state, i) => (
          <Fragment key={i}>
            <Col {...createSpan(6)}>
              <Form.Item
                name={[type, state.name as string, "source"]}
                label="State"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...createSpan(6)}>
              <Form.Item
                name={[type, state.name as string, "serviceName"]}
                label="Service"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...createSpan(8)}>
              <Form.Item
                name={[type, state.name as string, "baseUrl"]}
                label="Endpoint"
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col {...createSpan(4)}>
              <Form.Item
                name={[type, state.name as string, "alias"]}
                label="Alias"
              >
                <Select
                  options={(
                    serviceConfigMap[state.service as string] || []
                  ).map((config) => ({
                    label: config.alias,
                    value: config.alias,
                  }))}
                />
              </Form.Item>
            </Col>
          </Fragment>
        ));
    }
    return services
      .filter((service) => service)
      .map((service, i) => (
        <Fragment key={i}>
          <Col {...createSpan(10)}>
            <Form.Item name={[type, service, "serviceName"]} label="Service">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...createSpan(10)}>
            <Form.Item
              name={[type, service, "baseUrl"]}
              label="Endpoint"
              tooltip={form.getFieldValue(service)?.baseUrl}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col {...createSpan(4)}>
            <Form.Item name={[type, service, "alias"]} label="Alias">
              <Select
                options={(serviceConfigMap[service] || []).map((config) => ({
                  label: config.alias,
                  value: config.alias,
                }))}
              />
            </Form.Item>
          </Col>
        </Fragment>
      ));
  };

  return (
    <AppVerticalStepContent>
      <AppForm
        form={form}
        layout="vertical"
        onValuesChange={
          type === "service"
            ? handleServiceValuesChange
            : handleStateValuesChange
        }
      >
        <AppRow>{renderContent()}</AppRow>
      </AppForm>
    </AppVerticalStepContent>
  );
};
