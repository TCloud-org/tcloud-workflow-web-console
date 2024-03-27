import { Descriptions, DescriptionsProps, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditableColumn } from "../Config/LayoutConfig";
import { ServiceConfiguration } from "../Config/WorkflowConfig";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppLink } from "../DataEntryComponents/AppLink";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { getConfigurationsByService } from "../Network/WorkflowFetch";
import { formatDate } from "../Utils/DateUtils";
import { LinkOutlined } from "@ant-design/icons";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { Span } from "../Config/DataDisplayInterface";
import axios from "axios";
import { WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT } from "../Config/EndpointConfig";

export const ServiceDetailPage = () => {
  const { serviceName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const columns: EditableColumn[] = [
    {
      title: "Service Id",
      dataIndex: "serviceId",
      render: (text: string) => (
        <AppLink
          href={`/service/${serviceName}/${text}`}
          tooltip="Click to view or edit service endpoint"
        >
          {text}
        </AppLink>
      ),
    },
    {
      title: "Endpoint",
      dataIndex: "baseUrl",
    },
    {
      title: "Environment",
      dataIndex: "environment",
    },
    {
      title: "Alias",
      dataIndex: "alias",
      editable: true,
      width: "15%",
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
        await axios.post(WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT, formData);
        fetchConfig();
      },
    },
    {
      title: "Version",
      dataIndex: "version",
    },
    {
      title: "Last Modified",
      dataIndex: "createdAt",
      render: (text: string) => (
        <Typography.Text>{formatDate(text)}</Typography.Text>
      ),
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
    setLoading(true);
    const serviceConfig = await getConfigurationsByService(serviceName);
    setConfigurations(serviceConfig?.configurations || []);
    setLiveService(serviceConfig?.liveService);
    setNextAvailableVersion(serviceConfig?.nextAvailableVersion || 1);
    setLoading(false);
  }, [serviceName]);

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
        <a href={`/service/${serviceName}/${liveService?.serviceId}`}>
          <LinkOutlined /> Version {liveService?.version}
        </a>
      ),
    },
    {
      key: "2",
      label: "Next available version",
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

      <AppSurface>
        <Descriptions
          column={Span[1]}
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

        <AppButton onClick={handleCreateEndpoint}>
          Create a new endpoint
        </AppButton>
      </AppSpace>
      <AppTable
        rows={configurations}
        columns={columns}
        selected={selected}
        setSelected={setSelected}
        rowId="serviceId"
      />
    </AppSpace>
  );
};
