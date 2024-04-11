import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getServiceConfigurations } from "../../Network/WorkflowFetch";
import { Button } from "antd";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";

export const ServicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const serviceConfigurations = await getServiceConfigurations(clientId);
    const serviceConfigMap =
      serviceConfigurations?.serviceConfigurationMap || {};
    setServices(
      Object.keys(serviceConfigMap).map((service) => ({
        title: service,
        href: `${location.pathname}/${service}`,
      }))
    );
    setLoading(false);
  }, [clientId, location.pathname]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleAddService = () => {
    navigate("/service/add");
  };

  return (
    <AppSpace>
      <PageTitle>Service</PageTitle>
      <AppList
        data={services}
        header="Services"
        onReload={fetchServices}
        loading={loading}
        headerEndDecorator={
          <Button onClick={handleAddService}>Add a new service</Button>
        }
      />
    </AppSpace>
  );
};