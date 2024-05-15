import { CaretUpOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Typography } from "antd";
import axios from "axios";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectItem } from "../Config/DataDisplayInterface";
import {
  WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT,
  WOS_RERUN_WORKFLOW_ENDPOINT,
} from "../Config/WOSEndpointConfig";
import {
  Configuration,
  EndpointConfigTypes,
  Graph,
  ServiceConfiguration,
  WorkflowConfiguration,
  XMLGraphState,
} from "../Config/WorkflowConfig";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { FormButton } from "../DataEntryComponents/FormButton";
import { FormInput } from "../DataEntryComponents/FormInput";
import { FormSelect } from "../DataEntryComponents/FormSelect";
import { AppRow } from "../LayoutComponents/AppRow";
import { AppSheet } from "../LayoutComponents/AppSheet";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { Box } from "../LayoutComponents/Box";
import { fetchServiceConfiguration } from "../Network/WorkflowFetch";
import { extractServices, extractStates } from "../Utils/ObjectUtils";
import { EndpointConfigByService } from "./EndpointConfigByService";
import { EndpointConfigByState } from "./EndpointConfigByState";
import { WorkflowModal } from "./WorkflowModal";

export const RerunConfiguration = forwardRef<
  HTMLDivElement,
  { onClose?: () => void; onRefresh?: () => void }
>(({ onClose = () => {}, onRefresh = () => {} }, ref) => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);
  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const { workId } = useParams();

  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [workflowAlias, setWorkflowAlias] = useState<string>("live");
  const [services, setServices] = useState<string[]>([]);
  const [states, setStates] = useState<XMLGraphState[]>([]);
  const [endpointConfigType, setEndpointConfigType] =
    useState<string>("service");
  const [serviceConfigMap, setServiceConfigMap] = useState<{
    [service: string]: ServiceConfiguration[];
  }>({});
  const [fetchConfigMapLoading, setFetchConfigMapLoading] =
    useState<boolean>(false);
  const [fetchWorkflowAliasLoading, setFetchWorkflowAliasLoading] =
    useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [stateConfigFormData, setStateConfigFormData] = useState<{
    [key: string]: string;
  }>({});
  const [serviceConfigFormData, setServiceConfigFormData] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchConfigurationsForAllServices = useCallback(async () => {
    setFetchConfigMapLoading(true);

    const configMap: { [service: string]: ServiceConfiguration[] } = {};

    try {
      const promises = services.map(async (service) => {
        const configs = await fetchServiceConfiguration(service, authToken);
        configMap[service] = configs;
      });

      await Promise.all(promises);

      setServiceConfigMap(configMap);
    } catch (error) {
      console.error("Error fetching configurations:", error);
    }

    setFetchConfigMapLoading(false);
  }, [services, authToken]);

  const fetchWorkflowAliases = useCallback(async () => {
    if (workflowId) {
      setFetchWorkflowAliasLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios
        .get(
          `${WOS_GET_GRAPHS_BY_WORKFLOW_ID_ENDPOINT}?workflowId=${workflowId}`,
          config
        )
        .then((response) => {
          setGraphs(response.data.graphs);
        })
        .catch((error) => console.error(error));

      setFetchWorkflowAliasLoading(false);
    }
  }, [workflowId, authToken]);

  const updateStatesForEndpointConfigByState = useCallback(() => {
    if (workflowAlias && graphs.length > 0) {
      const graph = graphs.find((item) => item.alias === workflowAlias);
      const extractedStates = extractStates(graph);
      setStates(extractedStates);
      setStateConfigFormData((prev: any) =>
        extractedStates.reduce((result, state) => {
          result[state.source] = prev[state.source] || "live";
          return result;
        }, {})
      );
    }
  }, [graphs, workflowAlias]);

  const updateServicesForEndpointConfigByService = useCallback(() => {
    if (workflowAlias && graphs.length > 0) {
      const graph = graphs.find((item) => item.alias === workflowAlias);
      const extractedServices = extractServices(graph);
      setServices(extractedServices);
      setServiceConfigFormData((prev: { [name: string]: string }) =>
        extractedServices.reduce(
          (result: { [key: string]: string }, service: string) => {
            result[service] = prev[service] || "live";
            return result;
          },
          {}
        )
      );
    }
  }, [graphs, workflowAlias]);

  useEffect(() => {
    updateServicesForEndpointConfigByService();
  }, [updateServicesForEndpointConfigByService]);

  useEffect(() => {
    updateStatesForEndpointConfigByState();
  }, [updateStatesForEndpointConfigByState]);

  useEffect(() => {
    fetchWorkflowAliases();
  }, [fetchWorkflowAliases]);

  useEffect(() => {
    fetchConfigurationsForAllServices();
  }, [fetchConfigurationsForAllServices]);

  const handleEndpointConfigChange = (value: string) => {
    setEndpointConfigType(value);
    onRefresh();
  };

  const handleViewGraph = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const mapFormDataToConfigurations = (data: any) => {
    return Object.entries(data).reduce(
      (acc: Record<string, Configuration>, [name, alias]) => {
        acc[name] = { name, alias } as Configuration;
        return acc;
      },
      {}
    );
  };

  const handleRerun = async () => {
    setLoading(true);

    const serviceEndpointConfigMap =
      endpointConfigType === "service"
        ? mapFormDataToConfigurations(serviceConfigFormData)
        : null;
    const stateEndpointConfigMap =
      endpointConfigType === "state"
        ? mapFormDataToConfigurations(stateConfigFormData)
        : null;

    const params = {
      clientId,
      workIds: [workId],
      workflowId,
      configuration: {
        workflowVersionConfig: {
          name: workflowName,
          alias: workflowAlias,
        },
        serviceEndpointConfigMap,
        stateEndpointConfigMap,
      } as WorkflowConfiguration,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios
      .post(WOS_RERUN_WORKFLOW_ENDPOINT, params, config)
      .then((_) => {
        setStateConfigFormData({});
        setWorkflowAlias("live");
      })
      .catch((err) => {
        console.error(err);
      });

    setLoading(false);

    onClose();
  };

  return (
    <>
      <AppSheet
        ref={ref}
        style={{
          marginTop: "16px",
        }}
      >
        <AppSpace
          loading={
            fetchConfigMapLoading || fetchWorkflowAliasLoading || loading
          }
        >
          <Box>
            <Typography.Text strong style={{ fontSize: "16px" }}>
              Rerun with Configuration
            </Typography.Text>
          </Box>
          <AppRow>
            <Col span={24}>
              <Typography.Text strong>1. Configure Workflow</Typography.Text>
            </Col>
            <Col span={10}>
              <FormInput label="Workflow" value={workflowName} disabled />
            </Col>
            <Col span={10}>
              <FormSelect
                options={graphs.map(
                  (graph) =>
                    ({
                      label: graph.alias,
                      value: graph.alias,
                    } as SelectItem)
                )}
                placeholder="Select an alias"
                label="Alias"
                value={workflowAlias}
                onChange={(value) => setWorkflowAlias(value)}
              />
            </Col>
            <Col span={4}>
              <FormButton width="100%" label=" " onClick={handleViewGraph}>
                View graph
              </FormButton>
            </Col>
          </AppRow>
          <AppRow>
            <Col span={24}>
              <AppSpace size="small" direction="horizontal">
                <Typography.Text strong>
                  2. Configure Endpoint by
                </Typography.Text>
                <FormSelect
                  style={{ width: 100 }}
                  options={EndpointConfigTypes}
                  value={endpointConfigType}
                  onChange={handleEndpointConfigChange}
                />
              </AppSpace>
            </Col>
            {endpointConfigType === "service"
              ? services.map((service, i) => (
                  <EndpointConfigByService
                    key={i}
                    service={service}
                    serviceConfigMap={serviceConfigMap}
                    value={serviceConfigFormData[service]}
                    dispatch={setServiceConfigFormData}
                  />
                ))
              : states.map((state, i) => (
                  <EndpointConfigByState
                    key={i}
                    state={state}
                    serviceConfigMap={serviceConfigMap}
                    value={stateConfigFormData[state.source] || "live"}
                    dispatch={setStateConfigFormData}
                  />
                ))}
          </AppRow>
          <Flex justify="center">
            <Button onClick={handleRerun}>Rerun with this configuration</Button>
          </Flex>
          <Box>
            <AppIconButton width="100%" onClick={onClose} type="text">
              <CaretUpOutlined />
            </AppIconButton>
          </Box>
        </AppSpace>
      </AppSheet>
      <WorkflowModal
        open={modalOpen}
        alias={workflowAlias}
        onClose={handleCloseModal}
      />
    </>
  );
});
