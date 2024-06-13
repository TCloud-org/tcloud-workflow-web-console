import { CloseRounded } from "@mui/icons-material";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { Button, Steps } from "antd";
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
import { fetchServiceConfiguration } from "../Network/WorkflowFetch";
import { EndpointConfigByState } from "./EndpointConfigByState";
import { GraphState } from "./GraphBuilder";
import { decodeWorkId } from "Utils/IdentifierUtils";

export const RetryConfiguration = forwardRef<
  HTMLDivElement,
  { onClose?: () => void; routes?: Route[] }
>(({ onClose = () => {}, routes = [] }, ref) => {
  const { workId } = useParams();
  const { clientId, workflowId } = decodeWorkId(workId || "");

  const authToken = useSelector((state: any) => state.auth.token);

  const [lastRoute, setLastRoute] = useState<Route>();
  const [configurations, setConfigurations] = useState<ServiceConfiguration[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  const fetchConfig = useCallback(async () => {
    if (routes.length > 0 && clientId) {
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
        <PageTitle
          level={5}
          endDecorator={
            <AppIconButton type="text" onClick={onClose}>
              <CloseRounded />
            </AppIconButton>
          }
        >
          Retry with Configuration
        </PageTitle>
        <Steps
          progressDot
          direction="vertical"
          current={1}
          items={[
            {
              title: "Configure endpoint by service",
              description: (
                <AppRow gutter={[16, 16]} className="mt-2">
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
              ),
            },
          ]}
        />
        <Button type="primary" onClick={handleRetry}>
          Retry with this configuration
        </Button>
      </AppSpace>
    </AppSheet>
  );
});
