import { Button, Typography } from "antd";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { AppSheet } from "../LayoutComponents/AppSheet";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { Box } from "../LayoutComponents/Box";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { CaretUpOutlined } from "@ant-design/icons";
import {
  Route,
  ServiceConfiguration,
  XMLGraphState,
} from "../Config/WorkflowConfig";
import { fetchServiceConfiguration } from "../Network/WorkflowFetch";
import { AppRow } from "../LayoutComponents/AppRow";
import { EndpointConfigByState } from "./EndpointConfigByState";
import axios from "axios";
import { WOS_RETRY_WORKFLOW_ENDPOINT } from "../Config/EndpointConfig";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const RetryConfiguration = forwardRef<
  HTMLDivElement,
  { onClose?: () => void; routes?: Route[] }
>(({ onClose, routes = [] }, ref) => {
  const { workId } = useParams();

  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);

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
      setConfigurations(await fetchServiceConfiguration(last.service));

      setLoading(false);
    }
  }, [routes]);

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
        stateConfigurations: Object.entries(formData).map(([name, alias]) => ({
          name,
          alias,
        })),
      },
    };

    await axios
      .post(WOS_RETRY_WORKFLOW_ENDPOINT, params)
      .then((_) => {
        setFormData({});
      })
      .catch((err) => {
        console.error(err);
      });

    setLoading(false);
  };

  return (
    <AppSheet ref={ref} style={{ marginTop: "16px" }}>
      <AppSpace loading={loading}>
        <Box>
          <Typography.Text strong>Retry with Configuration</Typography.Text>
        </Box>
        <AppRow>
          <EndpointConfigByState
            state={
              {
                source: lastRoute?.source,
                service: lastRoute?.service,
              } as XMLGraphState
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
        <Box>
          <Button onClick={handleRetry}>Retry with this configuration</Button>
        </Box>
        <Box>
          <AppIconButton width="100%" onClick={onClose} type="text">
            <CaretUpOutlined />
          </AppIconButton>
        </Box>
      </AppSpace>
    </AppSheet>
  );
});
