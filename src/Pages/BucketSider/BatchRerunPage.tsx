import { GraphState } from "WorkflowComponents/GraphBuilder";
import { Flex, Form, Select, Steps } from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItem } from "../../Config/DataDisplayInterface";
import { WOS_RERUN_WORKFLOW_ENDPOINT } from "../../Config/WOSEndpointConfig";
import {
  Configuration,
  EndpointConfigTypes,
  Graph,
  ServiceConfiguration,
  WorkflowConfiguration,
} from "../../Config/WorkflowConfig";
import { AppHeading } from "../../DataDisplayComponents/AppHeading";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";
import {
  fetchGraphsById,
  fetchServiceConfiguration,
} from "../../Network/WorkflowFetch";
import { extractServices, extractStates } from "../../Utils/ObjectUtils";
import { BatchRerunConfigureEndpointStep } from "../../WorkflowComponents/BucketBatch/BatchRerunConfigureEndpointStep";
import { BatchRerunConfigureWorkflowStep } from "../../WorkflowComponents/BucketBatch/BatchRerunConfigureWorkflowStep";

export const BatchRerunPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workIds = [], bucketId }: { workIds: Key[]; bucketId: string } =
    location.state || {};
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);
  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [form] = Form.useForm();

  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [rerunLoading, setRerunLoading] = useState<boolean>(false);
  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [liveGraph, setLiveGraph] = useState<Graph>();
  const [endpointConfigType, setEndpointConfigType] =
    useState<string>("service");
  const [services, setServices] = useState<string[]>([]);
  const [serviceConfigMap, setServiceConfigMap] = useState<{
    [service: string]: ServiceConfiguration[];
  }>({});
  const [states, setStates] = useState<GraphState[]>([]);

  const fetchConfigurationsForAllServices = useCallback(async () => {
    setLoading(true);

    const configMap: { [service: string]: ServiceConfiguration[] } = {};

    const promises = services.map(async (service) => {
      const res = await fetchServiceConfiguration(clientId, service, authToken);
      configMap[service] = res.configurations;
    });

    await Promise.all(promises);

    setServiceConfigMap(configMap);

    setLoading(false);
  }, [services, authToken, clientId]);

  const fetchWorkflowAliases = useCallback(async () => {
    setLoading(true);

    const response = await fetchGraphsById(workflowId, authToken);
    setGraphs(response?.graphs || []);
    setLiveGraph(response?.liveGraph);

    setLoading(false);
  }, [workflowId, authToken]);

  useEffect(() => {
    if (graphs.length > 0) {
      const workflowAlias = form.getFieldValue("workflowVersionConfig")?.alias;
      if (!workflowAlias) return;

      const graph = graphs.find((item) => item.alias === workflowAlias);
      if (!graph) return;

      const extractedServices = extractServices(graph);
      setServices(extractedServices.filter((service) => service));

      const extractedStates = extractStates(graph);
      setStates(extractedStates);
    }
  }, [graphs, form]);

  useEffect(() => {
    fetchWorkflowAliases();
  }, [fetchWorkflowAliases]);

  useEffect(() => {
    fetchConfigurationsForAllServices();
  }, [fetchConfigurationsForAllServices]);

  useEffect(() => {
    if (workflowName) {
      form.setFieldsValue({
        workflowName,
      });
    }
    if (liveGraph) {
      form.setFieldsValue({
        workflowVersionConfig: {
          name: workflowName,
          alias: liveGraph.alias,
        },
      });
    }
  }, [workflowName, liveGraph, form]);

  const handleRerun = async () => {
    setRerunLoading(true);

    const serviceEndpointConfigMap =
      endpointConfigType === "service"
        ? Object.entries(form.getFieldValue(endpointConfigType)).reduce(
            (res: { [key: string]: Configuration }, [service, data]) => {
              const item: any = data || {};
              res[service] = {
                name: item.serviceName,
                alias: item.alias,
              } as Configuration;
              return res;
            },
            {}
          )
        : null;

    const stateEndpointConfigMap =
      endpointConfigType === "state"
        ? Object.entries(form.getFieldValue(endpointConfigType)).reduce(
            (res: { [key: string]: Configuration }, [source, data]) => {
              const item: any = data || {};
              res[source] = {
                name: source,
                alias: item.alias,
              } as Configuration;
              return res;
            },
            {}
          )
        : null;

    const request = {
      clientId,
      workIds,
      workflowId,
      configuration: {
        workflowVersionConfig: {
          ...form.getFieldValue("workflowVersionConfig"),
          name: workflowName,
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

    await axios.post(WOS_RERUN_WORKFLOW_ENDPOINT, request, config);

    setRerunLoading(false);
    navigate("/bucket");
  };

  return (
    <AppSpace loading={loading}>
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
                  headerSurface
                  headerTooltip="Bucket serialized ID"
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
            title: <AppHeading>2. Configure Workflow</AppHeading>,
            description: (
              <BatchRerunConfigureWorkflowStep graphs={graphs} form={form} />
            ),
          },
          {
            title: (
              <AppSpace
                size="small"
                direction="horizontal"
                style={{ alignItems: "start" }}
              >
                <AppHeading>3. Configure Endpoint by</AppHeading>
                <Select
                  style={{ width: 100 }}
                  size="small"
                  options={EndpointConfigTypes}
                  value={endpointConfigType}
                  onChange={setEndpointConfigType}
                />
              </AppSpace>
            ),
            description: (
              <BatchRerunConfigureEndpointStep
                form={form}
                type={endpointConfigType}
                services={services}
                states={states}
                serviceConfigMap={serviceConfigMap}
              />
            ),
          },
        ]}
      />

      <Flex justify="center">
        <AppButton
          tooltip={`Rerun a batch of ${workIds.length} items`}
          type="primary"
          onClick={handleRerun}
          loading={rerunLoading}
        >
          Batch Rerun
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
