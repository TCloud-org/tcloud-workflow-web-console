import { Col } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Fragment } from "react/jsx-runtime";
import { SelectItem } from "../Config/DataDisplayInterface";
import { ServiceConfiguration, XMLGraphState } from "../Config/WorkflowConfig";
import { FormInput } from "../DataEntryComponents/FormInput";
import { FormSelect } from "../DataEntryComponents/FormSelect";

export const EndpointConfigByState = (props: {
  state: XMLGraphState;
  serviceConfigMap: { [key: string]: ServiceConfiguration[] };
  dispatch?: Dispatch<SetStateAction<any>>;
  value?: string | undefined;
}) => {
  const { state, serviceConfigMap = {}, dispatch, value } = props;

  const configurations = serviceConfigMap[state.service] || [];

  const handleAliasChange = (value: string) => {
    if (dispatch) {
      dispatch((prev: any) => ({ ...prev, [state.source]: value }));
    }
  };

  return (
    <Fragment>
      <Col span={4}>
        <FormInput label="State" value={state.source} disabled />
      </Col>
      <Col span={8}>
        <FormInput label="Service" value={state.service} disabled />
      </Col>
      <Col span={8}>
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
          onChange={handleAliasChange}
        />
      </Col>
    </Fragment>
  );
};
