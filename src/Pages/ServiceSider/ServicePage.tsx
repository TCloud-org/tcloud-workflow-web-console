import { AppButton } from "DataEntryComponents/AppButton";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppList } from "../../DataDisplayComponents/AppList";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getServiceConfigurations } from "../../Network/WorkflowFetch";

export const ServicePage = () => {
  const navigate = useNavigate();
  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const res = await getServiceConfigurations(clientId, authToken);
    const serviceConfigMap = res?.serviceConfigurationMap || {};
    setServices(
      Object.keys(serviceConfigMap).map((service) => ({
        title: service,
        href: `service-configuration/${service}`,
      }))
    );
    setLoading(false);
  }, [clientId, authToken]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAddService = () => {
    navigate("/step-workflow/add-service-endpoint");
  };

  return (
    <AppSpace>
      <PageTitle
        id="service"
        onReload={fetchServices}
        endDecorator={
          <AppButton type="primary" onClick={handleAddService}>
            Add service endpoint
          </AppButton>
        }
      >
        Service Endpoint Configuration
      </PageTitle>
      <AppList data={services} header="Services" loading={loading} />
    </AppSpace>
  );
};
