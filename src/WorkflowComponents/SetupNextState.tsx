import {
  AddCircleRounded,
  AddRounded,
  RemoveCircleRounded,
} from "@mui/icons-material";
import { createSpan } from "Config/DataDisplayInterface";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { Divider, Flex, Form, Input, Modal, Tooltip, Typography } from "antd";
import { Fragment, useState } from "react";
import { GraphResult } from "./GraphBuilder";

export const SetupNextState = (props: {
  value?: GraphResult[];
  onChange?: (e: any) => void;
}) => {
  const { onChange = () => {} } = props;

  const [form] = Form.useForm();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleValueChanges = (_: any, values: any) => {
    onChange(values.results || []);
    form.setFieldsValue(values);
  };

  return (
    <>
      <Flex
        align="center"
        style={{ transition: "all 0.3s" }}
        className="hover:bg-slate-400/10 rounded-md cursor-pointer px-2"
        gap={8}
        onClick={() => setModalOpen(true)}
      >
        <AddRounded style={{ fontSize: "inherit" }} />
        <Typography.Text>Set up next state</Typography.Text>
      </Flex>
      <Modal
        open={modalOpen}
        centered
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        cancelButtonProps={{ className: "hidden" }}
        okText="Save"
      >
        <Flex vertical className="mt-8">
          <AppForm
            form={form}
            onValuesChange={handleValueChanges}
            labelCol={createSpan(6)}
            wrapperCol={createSpan(18)}
          >
            <Form.List name="results">
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
                                {`Result ${index + 1}`}
                              </Typography.Text>
                            }
                            className="w-full"
                            key={`${field.key}-result`}
                          >
                            <Form.Item
                              {...field}
                              label="Type"
                              key={`${field.key}-type`}
                              name={[field.name, "type"]}
                              labelCol={createSpan(6)}
                              wrapperCol={createSpan(18)}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...field}
                              label="Name"
                              key={`${field.key}-name`}
                              name={[field.name, "name"]}
                              labelCol={createSpan(6)}
                              wrapperCol={createSpan(18)}
                            >
                              <Input />
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
                      Add field
                    </AppButton>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </AppForm>
        </Flex>
      </Modal>
    </>
  );
};
