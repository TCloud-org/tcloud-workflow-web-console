import { Tabs } from "antd";
import { useCallback, useEffect, useState } from "react";
import { StepContentProps } from "../../Config/DataDisplayInterface";
import { AppEmpty } from "../../DataDisplayComponents/AppEmpty";
import { AppStepContentBox } from "../../DataDisplayComponents/AppStepContentBox";
import { getServicesFromGraph } from "../../Network/WorkflowFetch";
import { ServiceForm } from "./ServiceForm";
import { useSelector } from "react-redux";

export const AddEndpointStep = (props: StepContentProps) => {
  const { form, formData, stepKey } = props;

  const authToken = useSelector((state: any) => state.auth.token);

  const [services, setServices] = useState<string[]>([]);

  const fetchServicesFromGraph = useCallback(async () => {
    const graphStepKey = "Graph";
    if (formData[graphStepKey] && formData[graphStepKey].xmlContent) {
      const xml = formData[graphStepKey].xmlContent;
      const data = await getServicesFromGraph(xml, authToken);
      const fetchedServices = data?.services || [];
      setServices(fetchedServices);
    }
  }, [formData, authToken]);

  useEffect(() => {
    fetchServicesFromGraph();
  }, [fetchServicesFromGraph]);

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData[stepKey],
      });
    }
  }, [formData, form, stepKey]);

  const handleValuesChange = (e: any) => {
    form.setFieldsValue(e);
  };

  return (
    <AppStepContentBox title="Endpoint">
      {services.length > 0 ? (
        <Tabs
          defaultActiveKey={services[0]}
          centered
          items={services.map((service) => ({
            label: service,
            key: service,
            children: (
              <ServiceForm
                {...props}
                service={service}
                onValuesChange={handleValuesChange}
              />
            ),
          }))}
        />
      ) : (
        <AppEmpty />
      )}
    </AppStepContentBox>
  );
};
