import { EditOutlined } from "@ant-design/icons";
import { DescriptionsProps, Flex, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Span } from "../../Config/DataDisplayInterface";
import { ServiceConfiguration } from "../../Config/WorkflowConfig";
import { AppDescriptions } from "../../DataDisplayComponents/AppDescriptions";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { AppIconButton } from "../../DataEntryComponents/AppIconButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getConfigurationById } from "../../Network/WorkflowFetch";
import { formatDate } from "../../Utils/DateUtils";
import { formatCamelCaseKey } from "../../Utils/ObjectUtils";

export const ServiceEndpointSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceName, serviceId } = useParams();

  const [configuration, setConfiguration] = useState<ServiceConfiguration>();

  const fetchConfig = useCallback(async () => {
    const data = await getConfigurationById(serviceId);
    setConfiguration(data?.configuration);
  }, [serviceId]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const items: DescriptionsProps["items"] = Object.entries(
    configuration || {}
  ).map(([key, value]) => ({
    key,
    label: formatCamelCaseKey(key),
    span: Span[2].xl,
    children: key === "createdAt" ? formatDate(value) : value,
  }));

  const handleEdit = () => {
    navigate(`${location.pathname}/edit`, {
      state: {
        data: configuration,
      },
    });
  };

  return (
    <AppSpace>
      <Flex justify="space-between" align="center">
        <Typography.Title
          level={4}
        >{`${serviceName} v${configuration?.version}`}</Typography.Title>
        <AppIconButton onClick={handleEdit}>
          <EditOutlined />
        </AppIconButton>
      </Flex>

      <AppSurface style={{ paddingBottom: 0 }}>
        <AppDescriptions layout="vertical" title="Details" items={items} />
      </AppSurface>
    </AppSpace>
  );
};
