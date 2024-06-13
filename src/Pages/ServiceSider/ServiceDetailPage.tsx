import { LinkOutlined } from "@ant-design/icons";
import { DescriptionsProps, Typography } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Span } from "../../Config/DataDisplayInterface";
import { EditableColumn } from "../../Config/LayoutConfig";
import { WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { ServiceConfiguration } from "../../Config/WorkflowConfig";
import { AppDescriptions } from "../../DataDisplayComponents/AppDescriptions";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { AppTable } from "../../DataDisplayComponents/AppTable";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppLink } from "../../DataEntryComponents/AppLink";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { fetchServiceConfiguration } from "../../Network/WorkflowFetch";
import { formatDate } from "../../Utils/DateUtils";

export const ServiceDetailPage = () => {
  const { serviceName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const columns: EditableColumn[] = [
    {
      title: "Service Id",
      dataIndex: "serviceId",
      render: (text: string) => (
        <AppLink
          href={`/service-configuration/${serviceName}/${encodeURIComponent(
            text
          )}`}
          tooltip="Click to view or edit service endpoint"
        >
          {text}
        </AppLink>
      ),
    },
    {
      title: "Endpoint",
      dataIndex: "baseUrl",
      sorter: (a, b) => a["baseUrl"].localeCompare(b["baseUrl"]),
    },
    {
      title: "Environment",
      dataIndex: "environment",
      sorter: (a, b) => a["environment"].localeCompare(b["environment"]),
    },
    {
      title: "Alias",
      dataIndex: "alias",
      editable: true,
      handleSave: async (value: ServiceConfiguration) => {
        const formData = {
          serviceId: value.serviceId,
          serviceName: value.serviceName,
          clientId: value.clientId,
          baseUrl: value.baseUrl,
          environment: value.environment,
          alias: value.alias,
        };
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        await axios.post(
          WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT,
          formData,
          config
        );
        fetchConfig();
      },
    },
    {
      title: "Version",
      dataIndex: "version",
      sorter: (a, b) => a["version"] - b["version"],
    },
    {
      title: "Last Modified",
      dataIndex: "createdAt",
      render: (text: string) => (
        <Typography.Text>{formatDate(text)}</Typography.Text>
      ),
      sorter: (a, b) =>
        new Date(a["createdAt"]).getTime() - new Date(b["createdAt"]).getTime(),
    },
  ];

  const [configurations, setConfigurations] = useState<ServiceConfiguration[]>(
    []
  );
  const [liveService, setLiveService] = useState<ServiceConfiguration>();
  const [nextAvailableVersion, setNextAvailableVersion] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>([]);

  const fetchConfig = useCallback(async () => {
    if (clientId && serviceName && authToken) {
      setLoading(true);
      const serviceConfig = await fetchServiceConfiguration(
        clientId,
        serviceName,
        authToken
      );
      setConfigurations(serviceConfig?.configurations || []);
      setLiveService(serviceConfig?.liveService);
      setNextAvailableVersion(serviceConfig?.nextAvailableVersion || 1);
      setLoading(false);
    }
  }, [clientId, serviceName, authToken]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleCreateEndpoint = () => {
    navigate(`${location.pathname}/create`, {
      state: {
        serviceName,
      },
    });
  };

  const serviceDescriptions: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Live version",
      span: Span[3],
      children: (
        <a
          href={`/service-configuration/${serviceName}/${encodeURIComponent(
            liveService?.serviceId || ""
          )}`}
        >
          <LinkOutlined /> Version {liveService?.version}
        </a>
      ),
    },
    {
      key: "2",
      label: "Next version",
      children: nextAvailableVersion,
      span: Span[3],
    },
    {
      key: "3",
      label: "Total versions",
      children: configurations.length,
      span: Span[3],
    },
  ];

  return (
    <AppSpace loading={loading}>
      <Typography.Title level={4}>{serviceName}</Typography.Title>

      <AppSurface type="form" style={{ paddingBottom: 0 }}>
        <AppDescriptions
          layout="vertical"
          title="Details"
          items={serviceDescriptions}
        />
      </AppSurface>
      <AppSpace direction="horizontal">
        <AppButton type="primary" danger disabled={selected.length === 0}>
          {`Deprecate${
            selected.length > 0
              ? ` ${selected.length} service endpoint${
                  selected.length > 1 ? "s" : ""
                }`
              : ""
          }`}
        </AppButton>

        <AppButton onClick={handleCreateEndpoint} type="primary">
          Create a new endpoint
        </AppButton>
      </AppSpace>
      <AppTable
        rows={configurations}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        rowId="serviceId"
        heading="Versions"
      />
    </AppSpace>
  );
};
