import { DateUnit } from "Config/AutomationConfig";
import { Client } from "Config/SCSConfig";
import { WOS_REGISTER_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { capitalizeEachWord } from "Utils/StringUtils";
import {
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  SelectProps,
  Typography,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppForm } from "../../DataEntryComponents/AppForm";

export const AddWorkflowPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const authToken = useSelector((state: any) => state.auth.token);
  const clients: Client[] = useSelector((state: any) => state.client.clients);

  const [addLoading, setAddLoading] = useState<boolean>(false);

  const dateUnits: SelectProps["options"] = Object.keys(DateUnit).map(
    (key) => ({
      label: capitalizeEachWord(key.toLowerCase()),
      value: key,
    })
  );

  const handleValuesChange = (_: any, e: any) => {
    form.setFieldsValue(e);
  };

  const handleAdd = async () => {
    setAddLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const formData = {
      ...form.getFieldsValue(),
    };

    await axios.post(WOS_REGISTER_WORKFLOW_ENDPOINT, formData, config);

    setTimeout(() => {
      setAddLoading(false);
      navigate("/workflow");
    }, 2000);
  };

  return (
    <AppSpace>
      <Flex justify="center">
        <Typography.Title level={4}>Add a new workflow</Typography.Title>
      </Flex>

      <AppForm
        form={form}
        style={{ width: "100%" }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Workflow"
          name="workflowName"
          rules={[{ required: true, message: "Please enter a workflow name" }]}
        >
          <Input placeholder="Workflow" />
        </Form.Item>

        <Form.Item
          label="Client"
          name="clientId"
          tooltip="Ownership of the workflow"
          rules={[{ required: true, message: "Please select a client" }]}
        >
          <Select
            options={clients.map((client) => ({
              label: client.clientId,
              value: client.clientId,
            }))}
            placeholder="Client"
          />
        </Form.Item>

        <Form.Item
          label="Retention period"
          name={["retentionPeriod", "period"]}
          tooltip="Once a workflow enters the terminal state, it will remain available until the end of the retention period."
        >
          <InputNumber
            placeholder="Period"
            style={{ width: "100%" }}
            addonAfter={
              <Form.Item name={["retentionPeriod", "unit"]} noStyle>
                <Select
                  options={dateUnits}
                  placeholder="Unit"
                  style={{ width: 200 }}
                />
              </Form.Item>
            }
          />
        </Form.Item>

        <Flex justify="center">
          <Form.Item>
            <AppButton type="primary" onClick={handleAdd} loading={addLoading}>
              Add
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
