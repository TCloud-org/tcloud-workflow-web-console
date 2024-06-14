import { CloseRounded } from "@mui/icons-material";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { Button, Col, Divider, Flex, Steps } from "antd";
import axios from "axios";
import { Fragment, forwardRef, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectItem, createSpan } from "../Config/DataDisplayInterface";
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
} from "../Config/WorkflowConfig";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { FormButton } from "../DataEntryComponents/FormButton";
import { FormInput } from "../DataEntryComponents/FormInput";
import { FormSelect } from "../DataEntryComponents/FormSelect";
import { AppRow } from "../LayoutComponents/AppRow";
import { AppSheet } from "../LayoutComponents/AppSheet";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { fetchServiceConfiguration } from "../Network/WorkflowFetch";
import { extractServices, extractStates } from "../Utils/ObjectUtils";
import { EndpointConfigByService } from "./EndpointConfigByService";
import { EndpointConfigByState } from "./EndpointConfigByState";
import { GraphState } from "./GraphBuilder";
import { WorkflowModal } from "./WorkflowModal";
import { decodeWorkId } from "Utils/IdentifierUtils";

export const RerunConfiguration = forwardRef<
  HTMLDivElement,
  { onClose?: () => void; onRefresh?: () => void }
>(({ onClose = () => {}, onRefresh = () => {} }, ref) => {
  const authToken = useSelector((state: any) => state.auth.token);

  const { workId } = useParams();
  const { clientId, workflowId, workflowName } = decodeWorkId(workId || "");

  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [workflowAlias, setWorkflowAlias] = useState<string>("live");
  const [services, setServices] = useState<string[]>([]);
  const [states, setStates] = useState<GraphState[]>([]);
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
        if (!clientId) return;

        const res = await fetchServiceConfiguration(
          clientId,
          service,
          authToken
        );
        configMap[service] = res.configurations;
      });

      await Promise.all(promises);

      setServiceConfigMap(configMap);

      console.log(configMap);
    } catch (error) {
      console.error("Error fetching configurations:", error);
    }

    setFetchConfigMapLoading(false);
  }, [services, authToken, clientId]);

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
        extractedStates.reduce((result: any, state) => {
          result[state.name as string] = prev[state.name as string] || "live";
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
      workIds: [workId],
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
          <PageTitle
            style={{ paddingTop: 0 }}
            level={5}
            endDecorator={
              <AppIconButton type="text" onClick={onClose}>
                <CloseRounded />
              </AppIconButton>
            }
          >
            Rerun with Configuration
          </PageTitle>
          <Steps
            progressDot
            direction="vertical"
            current={2}
            items={[
              {
                title: "Configure Workflow",
                description: (
                  <AppRow gutter={[16, 16]} className="mt-2">
                    <Col {...createSpan(10)}>
                      <FormInput
                        label="Workflow"
                        value={workflowName}
                        disabled
                      />
                    </Col>
                    <Col {...createSpan(10)}>
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
                    <Col {...createSpan(4)}>
                      <FormButton
                        width="100%"
                        label=" "
                        onClick={handleViewGraph}
                      >
                        View graph
                      </FormButton>
                    </Col>
                  </AppRow>
                ),
              },
              {
                title: (
                  <Flex align="center" gap={8}>
                    Configure Endpoint by
                    <FormSelect
                      style={{ width: 100 }}
                      options={EndpointConfigTypes}
                      value={endpointConfigType}
                      onChange={handleEndpointConfigChange}
                    />
                  </Flex>
                ),
                description: (
                  <AppRow gutter={[16, 16]} className="mt-2">
                    {endpointConfigType === "service"
                      ? services.map((service, i) => (
                          <Fragment key={i}>
                            {i > 0 && (
                              <Divider
                                className="block lg:hidden"
                                style={{ margin: 0 }}
                              />
                            )}
                            <EndpointConfigByService
                              service={service}
                              serviceConfigMap={serviceConfigMap}
                              value={serviceConfigFormData[service]}
                              dispatch={setServiceConfigFormData}
                            />
                          </Fragment>
                        ))
                      : states.map((state, i) => (
                          <Fragment key={i}>
                            {i > 0 && (
                              <Divider
                                className="block lg:hidden"
                                style={{ margin: 0 }}
                              />
                            )}
                            <EndpointConfigByState
                              key={i}
                              state={state}
                              serviceConfigMap={serviceConfigMap}
                              value={
                                stateConfigFormData[state.name as string] ||
                                "live"
                              }
                              dispatch={setStateConfigFormData}
                            />
                          </Fragment>
                        ))}
                  </AppRow>
                ),
              },
            ]}
          />

          <Button type="primary" onClick={handleRerun}>
            Rerun with this configuration
          </Button>
        </AppSpace>
      </AppSheet>
      <WorkflowModal
        open={modalOpen}
        alias={workflowAlias}
        onClose={handleCloseModal}
        workflowId={workflowId}
      />
    </>
  );
});
