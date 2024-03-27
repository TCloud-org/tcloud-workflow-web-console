import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { useCallback, useEffect, useState } from "react";
import { getConfigurationById } from "../Network/WorkflowFetch";
import { ServiceConfiguration } from "../Config/WorkflowConfig";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { Descriptions, DescriptionsProps, Flex, Typography } from "antd";
import { Span } from "../Config/DataDisplayInterface";
import { formatCamelCaseKey } from "../Utils/ObjectUtils";
import { formatDate } from "../Utils/DateUtils";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { EditOutlined } from "@ant-design/icons";

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
    span: Span[2],
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

      <AppSurface>
        <Descriptions column={Span[1]} title="Details" items={items} />
      </AppSurface>
    </AppSpace>
  );
};
