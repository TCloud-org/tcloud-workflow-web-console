import {
  AddCircleRounded,
  AddRounded,
  RemoveCircleRounded,
} from "@mui/icons-material";
import { createSpan } from "Config/DataDisplayInterface";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import {
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  SelectProps,
  Tooltip,
  Typography,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import { GraphResult } from "./GraphBuilder";

export const resultTypes: SelectProps["options"] = [
  {
    label: "success",
    value: "success",
  },
  {
    label: "failure",
    value: "failure",
  },
  {
    label: "default",
    value: "default",
  },
  {
    label: "notified",
    value: "notified",
  },
  {
    label: "pending",
    value: "pending",
  },
];

export const SetupNextState = (props: {
  value?: (GraphResult | undefined)[];
  onChange?: (e: any) => void;
  modifyOnly?: boolean;
}) => {
  const { onChange = () => {}, value, modifyOnly } = props;

  const [form] = Form.useForm();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({ branches: value });
  }, [form, value]);

  const handleValueChanges = (_: any, values: any) => {
    onChange(values.branches || []);
    form.setFieldsValue(values);
  };

  return (
    <>
      <Flex
        align="center"
        style={{ transition: "all 0.3s" }}
        className="hover:bg-slate-400/10 rounded-md cursor-pointer px-2 py-1"
        gap={8}
        onClick={() => setModalOpen(true)}
      >
        <AddRounded style={{ fontSize: "inherit" }} />
        <Typography.Text>Set up next state</Typography.Text>
      </Flex>
      <Modal
        open={modalOpen}
        centered
        title="Branch"
        onCancel={() => setModalOpen(false)}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ className: "hidden" }}
      >
        <Flex vertical className="mt-8">
          <AppForm
            form={form}
            onValuesChange={handleValueChanges}
            labelCol={createSpan(6)}
            wrapperCol={createSpan(18)}
          >
            <Form.List name="branches">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Fragment key={`${field.key}-${index}`}>
                      {index > 0 && <Divider />}

                      <Flex gap={16}>
                        <Flex flex={1}>
                          <Form.Item
                            label={
                              <Typography.Text strong>
                                {`Branch ${index + 1}`}
                              </Typography.Text>
                            }
                            className="w-full"
                            key={`${field.key}-branch`}
                          >
                            <Form.Item
                              {...field}
                              label="Type"
                              key={`${field.key}-type`}
                              name={[field.name, "type"]}
                              labelCol={createSpan(6)}
                              wrapperCol={createSpan(18)}
                            >
                              <Select
                                options={resultTypes}
                                disabled={modifyOnly}
                              />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Name"
                              key={`${field.key}-name`}
                              name={[field.name, "name"]}
                              labelCol={createSpan(6)}
                              wrapperCol={createSpan(18)}
                            >
                              <Input disabled={modifyOnly} />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Target"
                              key={`${field.key}-target`}
                              name={[field.name, "target"]}
                              style={{ marginBottom: 0 }}
                              labelCol={createSpan(6)}
                              wrapperCol={createSpan(18)}
                            >
                              <Input />
                            </Form.Item>
                          </Form.Item>
                        </Flex>

                        {fields.length > 1 ? (
                          <Tooltip title="Remove">
                            <RemoveCircleRounded
                              style={{ fontSize: 22 }}
                              className="cursor-pointer"
                              onClick={() => remove(field.name)}
                            />
                          </Tooltip>
                        ) : null}
                      </Flex>
                    </Fragment>
                  ))}

                  {!modifyOnly && (
                    <Form.Item>
                      <AppButton
                        type="text"
                        onClick={() => add()}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        icon={<AddCircleRounded style={{ fontSize: 14 }} />}
                      >
                        Add branch
                      </AppButton>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
          </AppForm>
        </Flex>
      </Modal>
    </>
  );
};
