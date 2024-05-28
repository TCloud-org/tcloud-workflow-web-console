import { CaretUpOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import axios from "axios";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { WOS_RETRY_WORKFLOW_ENDPOINT } from "../Config/WOSEndpointConfig";
import { Route, ServiceConfiguration } from "../Config/WorkflowConfig";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppRow } from "../LayoutComponents/AppRow";
import { AppSheet } from "../LayoutComponents/AppSheet";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { Box } from "../LayoutComponents/Box";
import { fetchServiceConfiguration } from "../Network/WorkflowFetch";
import { EndpointConfigByState } from "./EndpointConfigByState";
import { GraphState } from "./GraphBuilder";

export const RetryConfiguration = forwardRef<
  HTMLDivElement,
  { onClose?: () => void; routes?: Route[] }
>(({ onClose = () => {}, routes = [] }, ref) => {
  const { workId } = useParams();

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [lastRoute, setLastRoute] = useState<Route>();
  const [configurations, setConfigurations] = useState<ServiceConfiguration[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  const fetchConfig = useCallback(async () => {
    if (routes.length > 0) {
      setLoading(true);

      const last = routes[routes.length - 1];
      setFormData((prev: any) => ({
        ...prev,
        [last.source]: prev[last.source] || "live",
      }));
      setLastRoute(last);
      const res = await fetchServiceConfiguration(
        clientId,
        last.service,
        authToken
      );
      setConfigurations(res.configurations);

      setLoading(false);
    }
  }, [routes, authToken, clientId]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleRetry = async () => {
    setLoading(true);

    const params = {
      clientId,
      workIds: [workId],
      workflowId,
      configuration: {
        stateEndpointConfigMap: Object.entries(formData).reduce(
          (result: { [key: string]: any }, [name, alias]) => {
            result[name] = { name, alias };
            return result;
          },
          {}
        ),
      },
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios
      .post(WOS_RETRY_WORKFLOW_ENDPOINT, params, config)
      .then((_) => {
        setFormData({});
      })
      .catch((err) => {
        console.error(err);
      });

    setLoading(false);

    onClose();
  };

  return (
    <AppSheet ref={ref} style={{ marginTop: "16px" }}>
      <AppSpace loading={loading}>
        <Box>
          <Typography.Text strong>Retry with Configuration</Typography.Text>
        </Box>
        <AppRow gutter={[16, 16]}>
          <EndpointConfigByState
            state={
              {
                name: lastRoute?.source,
                service: lastRoute?.service,
              } as GraphState
            }
            serviceConfigMap={
              { [lastRoute?.service || ""]: configurations } as {
                [service: string]: ServiceConfiguration[];
              }
            }
            value={formData[lastRoute?.source || ""] || "live"}
            dispatch={setFormData}
          />
        </AppRow>
        <Flex>
          <Button size="small" type="primary" onClick={handleRetry}>
            Retry with this configuration
          </Button>
        </Flex>
        <Box>
          <AppIconButton width="100%" onClick={onClose} type="text">
            <CaretUpOutlined />
          </AppIconButton>
        </Box>
      </AppSpace>
    </AppSheet>
  );
});
