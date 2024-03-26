import { Col } from "antd";
import { Dispatch, Fragment, SetStateAction } from "react";
import { SelectItem } from "../Config/DataDisplayInterface";
import { ServiceConfiguration } from "../Config/WorkflowConfig";
import { FormInput } from "../DataEntryComponents/FormInput";
import { FormSelect } from "../DataEntryComponents/FormSelect";

export const EndpointConfigByService = (props: {
  service: string;
  serviceConfigMap: { [key: string]: ServiceConfiguration[] };
  dispatch?: Dispatch<SetStateAction<any>>;
  value?: string;
}) => {
  const {
    service,
    serviceConfigMap = {},
    dispatch = () => {},
    value = "live",
  } = props;

  const configurations = serviceConfigMap[service] || [];

  return (
    <Fragment>
      <Col span={10}>
        <FormInput label="Service" value={service} disabled />
      </Col>
      <Col span={10}>
        <FormInput
          label="Endpoint"
          value={
            configurations.find((config) => config.alias === value)?.baseUrl
          }
          disabled
        />
      </Col>
      <Col span={4}>
        <FormSelect
          label="Alias"
          options={configurations.map(
            (config) =>
              ({ label: config.alias, value: config.alias } as SelectItem)
          )}
          value={value}
          onChange={(value) =>
            dispatch((prev: { [key: string]: string }) => ({
              ...prev,
              [service]: value,
            }))
          }
        />
      </Col>
    </Fragment>
  );
};
