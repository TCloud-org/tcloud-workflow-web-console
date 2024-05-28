import { Col } from "antd";
import { Dispatch, SetStateAction } from "react";
import { Fragment } from "react/jsx-runtime";
import { SelectItem, createSpan } from "../Config/DataDisplayInterface";
import { ServiceConfiguration } from "../Config/WorkflowConfig";
import { FormInput } from "../DataEntryComponents/FormInput";
import { FormSelect } from "../DataEntryComponents/FormSelect";
import { GraphState } from "./GraphBuilder";

export const EndpointConfigByState = (props: {
  state: GraphState;
  serviceConfigMap: { [key: string]: ServiceConfiguration[] };
  dispatch?: Dispatch<SetStateAction<any>>;
  value?: string | undefined;
}) => {
  const { state, serviceConfigMap = {}, dispatch, value } = props;

  const configurations = serviceConfigMap?.[state.service as string] || [];

  const handleAliasChange = (value: string) => {
    if (dispatch) {
      dispatch((prev: any) => ({ ...prev, [state.name as string]: value }));
    }
  };

  return (
    <Fragment>
      <Col {...createSpan(4)}>
        <FormInput label="State" value={state.name} disabled showTooltip />
      </Col>
      <Col {...createSpan(8)}>
        <FormInput label="Service" value={state.service} disabled />
      </Col>
      <Col {...createSpan(8)}>
        <FormInput
          label="Endpoint"
          value={
            configurations.find((config) => config.alias === value)?.baseUrl
          }
          disabled
          showTooltip
        />
      </Col>
      <Col {...createSpan(4)}>
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
