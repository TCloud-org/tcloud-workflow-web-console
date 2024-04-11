import {
  FileSyncOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Span } from "Config/DataDisplayInterface";
import {
  BitwiseOperatorOptions,
  Clause,
  ConditionOptions,
  DateConditionOptions,
  ListConditionOptions,
} from "Config/FilterConfig";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppSurfaceTitle } from "DataDisplayComponents/AppSurfaceTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppLine } from "LayoutComponents/AppLine";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import {
  formatCamelCaseKey,
  isNullCondition,
  noFilters,
} from "Utils/ObjectUtils";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  FormItemProps,
  FormProps,
  Input,
  Select,
  Typography,
  message,
} from "antd";
import { save, update } from "features/filter/workFilterSlice";
import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

type RenderProps = FormItemProps & {
  data?: any[];
  attribute?: string;
  condition?: string;
};
interface FilterInput {
  render: (props: RenderProps) => ReactNode;
}

const renderCheckboxInputs = (props: RenderProps) => {
  const data =
    Object.keys(
      props.data?.reduce((res, item) => {
        res[item[props.attribute || ""]] = true;
        return res;
      }, {})
    ) || [];
  return (
    <Flex gap="8px" style={{ flex: 1 }}>
      <Form.Item
        style={{ marginBottom: 0 }}
        name={[props.name[0], "condition"]}
      >
        <Select
          style={{ width: conditionWidth }}
          placeholder="Condition"
          options={ListConditionOptions}
        />
      </Form.Item>
      {!isNullCondition(props.condition) && (
        <AppSurface>
          <AppSpace size="small">
            <Typography.Text strong>Select all that apply</Typography.Text>
            <AppRow>
              {data.length === 0 ? (
                <AppEmpty style={{ margin: 0 }} />
              ) : (
                data.map((value, i) => (
                  <Col key={i} span={12}>
                    <Form.Item
                      name={[...props.name, value]}
                      valuePropName="checked"
                      style={{ marginBottom: 0 }}
                    >
                      <Checkbox>{value}</Checkbox>
                    </Form.Item>
                  </Col>
                ))
              )}
            </AppRow>
          </AppSpace>
        </AppSurface>
      )}
    </Flex>
  );
};

const renderDateExtendedInputs = (props: RenderProps) => {
  const selectedOption = DateConditionOptions.find(
    (option) => option.value === props?.condition
  );

  const renderComponent =
    selectedOption && selectedOption.render
      ? selectedOption.render(props)
      : null;

  return renderComponent;
};

const renderDateInputs = (props: RenderProps) => {
  return (
    <Flex gap="8px" style={{ flex: 1 }}>
      <Form.Item
        style={{ marginBottom: 0 }}
        name={[props.name[0], "condition"]}
      >
        <Select
          options={DateConditionOptions}
          style={{ width: conditionWidth }}
          placeholder="Condition"
        />
      </Form.Item>
      {renderDateExtendedInputs(props)}
    </Flex>
  );
};

const FilterCheckboxMapping: { [attribute: string]: FilterInput } = {
  source: {
    render: (props) => renderCheckboxInputs({ ...props, attribute: "source" }),
  },
  service: {
    render: (props) => renderCheckboxInputs({ ...props, attribute: "service" }),
  },
  operation: {
    render: (props) =>
      renderCheckboxInputs({ ...props, attribute: "operation" }),
  },
  resultName: {
    render: (props) =>
      renderCheckboxInputs({ ...props, attribute: "resultName" }),
  },
  resultType: {
    render: (props) =>
      renderCheckboxInputs({ ...props, attribute: "resultType" }),
  },
  graphId: {
    render: (props) => renderCheckboxInputs({ ...props, attribute: "graphId" }),
  },
};

const FilterDateMapping: { [attribute: string]: FilterInput } = {
  createdAt: {
    render: (props) => renderDateInputs({ ...props, attribute: "createdAt" }),
  },
  updatedAt: {
    render: (props) => renderDateInputs({ ...props, attribute: "updatedAt" }),
  },
  nextRetryAt: {
    render: (props) => renderDateInputs({ ...props, attribute: "nextRetryAt" }),
  },
};

const excluded = {
  runningOrder: true,
  clientId: true,
  workflowId: true,
  version: true,
  retryScheduleId: true,
  metadata: true,
};

const parent = "clauses";
const operatorWidth = "80px";
const conditionWidth = "130px";
const attributeWidth = "200px";

export const WorkFilterBuilder = (props: {
  data?: any[];
  clauses?: Clause[];
  setClauses?: Dispatch<SetStateAction<any[]>>;
}) => {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const { active }: { active?: string } = useSelector(
    (state: any) => state.workFilter
  );

  const [form] = Form.useForm();

  const setRefreshToken = useState<string>("")[1];

  const { data = [], setClauses = () => {}, clauses = [] } = props;

  useEffect(() => {
    form.setFieldValue(parent, clauses);
  }, [clauses, form]);

  const handleValuesChange = (e: any, values: FormProps["onValuesChange"]) => {
    const par = e?.[parent] as any[];
    const index = par.findIndex((item: any) => item);

    const clauses = [...form.getFieldValue(parent)];
    if (index < clauses.length && par?.[index]?.attribute) {
      clauses[index] = {
        attribute: par[index].attribute,
        operator: clauses[index].operator,
        ...(par[index].attribute in FilterCheckboxMapping && {
          condition: "IN",
        }),
      };
      form.setFieldValue(parent, clauses);
    } else {
      form.setFieldsValue(values);
    }
    setRefreshToken(v4());
  };

  const renderInputs = (name: number) => {
    const items = form.getFieldValue(parent) || [];
    const attribute = items?.[name]?.attribute || "";
    const condition = items?.[name]?.condition;

    if (attribute in FilterCheckboxMapping) {
      return FilterCheckboxMapping[attribute].render({
        data,
        name: [name, "checkbox"],
        condition,
      });
    }

    if (attribute in FilterDateMapping) {
      return FilterDateMapping[attribute].render({
        data,
        name: [name, "date"],
        condition,
      });
    }

    return (
      <Flex gap="8px" style={{ flex: 1 }}>
        <Form.Item style={{ marginBottom: 0 }} name={[name, "condition"]}>
          <Select
            style={{ width: conditionWidth }}
            placeholder="Condition"
            options={ConditionOptions}
            size="small"
          />
        </Form.Item>
        {!isNullCondition(condition) && (
          <Form.Item
            style={{ marginBottom: 0, flex: 1 }}
            name={[name, "input"]}
          >
            <Input placeholder={`Enter ${formatCamelCaseKey(attribute)}`} />
          </Form.Item>
        )}
      </Flex>
    );
  };

  const handleApply = () => {
    setClauses((form.getFieldValue(parent) || []).filter(filter));
    form.resetFields();
  };

  const filter = (clause: Clause) => {
    return (
      clause &&
      clause.attribute &&
      (Object.values(clause.checkbox || {}).some((checked) => checked) ||
        clause.input ||
        clause.date ||
        (clause.condition && clause.condition.toLowerCase().includes("null")))
    );
  };

  const handleRemoveClause = (name: number) => {
    const copy = [...form.getFieldValue(parent)];
    copy.splice(name, 1);
    form.setFieldValue(parent, copy);
    setRefreshToken(v4());
  };

  const handleAddClause = (add: () => void) => {
    const filters = [...(form.getFieldValue(parent) || [])];
    if (filters.length > 0) {
      filters.push({
        operator: "AND",
      });
      form.setFieldValue(parent, filters);
    } else {
      add();
    }
    setRefreshToken(v4());
  };

  const handleSaveQuery = () => {
    const items = [...(form.getFieldValue(parent) || []).filter(filter)];
    if (items.length === 0) {
      return;
    }
    const savedClauses = JSON.parse(JSON.stringify([...items]));
    dispatch(save(savedClauses));

    messageApi.success("Query saved");
  };

  const handleUpdateQuery = () => {
    const items = [...(form.getFieldValue(parent) || []).filter(filter)];
    if (items.length === 0) {
      return;
    }
    const savedClauses = JSON.parse(JSON.stringify([...items]));
    dispatch(update({ clauses: savedClauses, key: active }));

    messageApi.success("Query updated");
  };

  const handleReset = () => {
    form.setFieldValue(parent, []);
    setClauses([]);
  };

  return (
    <Fragment>
      {contextHolder}
      <AppSurface>
        <AppSpace>
          <Flex align="center" justify="space-between">
            <AppSurfaceTitle>Where</AppSurfaceTitle>

            <Flex align="center" gap="8px">
              <AppButton
                icon={<SaveOutlined />}
                size="small"
                type="primary"
                disabled={noFilters(
                  (form.getFieldValue(parent) || []).filter(filter)
                )}
                onClick={handleSaveQuery}
              >
                Save query
              </AppButton>
              {active !== undefined && (
                <AppButton
                  icon={<FileSyncOutlined />}
                  size="small"
                  onClick={handleUpdateQuery}
                >
                  Update query
                </AppButton>
              )}
            </Flex>
          </Flex>
          <AppForm
            form={form}
            wrapperCol={Span[1]}
            onValuesChange={handleValuesChange}
          >
            <Card bordered={false}>
              <Form.List name={parent}>
                {(fields, { add, remove }) => (
                  <Flex vertical gap="8px">
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Flex gap="8px" vertical key={index}>
                        {index > 0 && (
                          <Flex
                            justify="center"
                            align="center"
                            gap="8px"
                            style={{ margin: "8px 0" }}
                          >
                            <AppLine />
                            <Form.Item
                              name={[name, "operator"]}
                              style={{ marginBottom: 0 }}
                            >
                              <Select
                                size="small"
                                options={BitwiseOperatorOptions}
                                style={{ width: operatorWidth }}
                              />
                            </Form.Item>
                            <AppLine />
                          </Flex>
                        )}

                        <Flex gap="8px" justify="space-between">
                          <Form.Item
                            {...restField}
                            name={[name, "attribute"]}
                            style={{ marginBottom: 0 }}
                          >
                            <Select
                              size="small"
                              showSearch
                              style={{ width: attributeWidth }}
                              options={Object.keys(
                                data.length === 0 ? {} : data[0]
                              )
                                .filter((k) => !(k in excluded))
                                .map((k) => ({
                                  label: k,
                                  value: k,
                                }))}
                              placeholder="Attribute"
                            />
                          </Form.Item>

                          {renderInputs(name)}

                          <Form.Item style={{ marginBottom: 0 }}>
                            <AppIconButton
                              danger
                              tooltip="Remove clause"
                              onClick={() => handleRemoveClause(name)}
                            >
                              <MinusCircleOutlined />
                            </AppIconButton>
                          </Form.Item>
                        </Flex>
                      </Flex>
                    ))}
                    <Divider style={{ margin: "8px 0" }} />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Button
                        type="dashed"
                        onClick={() => handleAddClause(add)}
                        icon={<PlusOutlined />}
                      >
                        Add clause
                      </Button>
                    </Form.Item>
                    <Divider style={{ margin: "8px 0" }} />
                    <Flex gap="8px" align="center">
                      <Form.Item style={{ marginBottom: 0 }}>
                        <AppButton
                          type="primary"
                          onClick={handleApply}
                          disabled={
                            (form.getFieldValue(parent) || []).length === 0
                          }
                        >
                          Apply
                        </AppButton>
                      </Form.Item>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <AppButton
                          type="text"
                          onClick={handleReset}
                          disabled={
                            (form.getFieldValue(parent) || []).length === 0
                          }
                        >
                          Reset
                        </AppButton>
                      </Form.Item>
                    </Flex>
                  </Flex>
                )}
              </Form.List>
            </Card>
          </AppForm>
        </AppSpace>
      </AppSurface>
    </Fragment>
  );
};
