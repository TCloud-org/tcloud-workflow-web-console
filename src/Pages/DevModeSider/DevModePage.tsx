import { WOS_INITIATE_TCA_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Form, Input, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const DevModePage = () => {
  const authToken = useSelector((state: any) => state.auth.token);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );
  const [workId, setWorkId] = useState<string>("");

  const [form] = Form.useForm();

  const [initiatedLoading, setInitiatedLoading] = useState<boolean>(false);

  useEffect(() => {
    if (workflowId) {
      form.setFieldValue("workflowId", workflowId);
    }
  }, [workflowId, form]);

  const initiate = async () => {
    setInitiatedLoading(true);

    const formData = {
      ...form.getFieldsValue(),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios
      .post(WOS_INITIATE_TCA_WORKFLOW_ENDPOINT, formData, config)
      .then((res) => {
        setWorkId(res.data.workId);
      })
      .catch((error) => console.error(error));

    setInitiatedLoading(false);
  };

  return (
    <AppSpace>
      <PageTitle>Development</PageTitle>

      <Typography.Text>
        Work ID:{" "}
        <Typography.Link
          href={`/live/${encodeURIComponent(workId)}`}
          target="_blank"
        >
          {workId}
        </Typography.Link>
      </Typography.Text>

      <AppForm
        form={form}
        onValuesChange={(_, values) => form.setFieldsValue(values)}
      >
        <Form.Item label="Workflow" name="workflowId">
          <Input />
        </Form.Item>

        <Flex>
          <Form.Item noStyle>
            <AppButton
              loading={initiatedLoading}
              type="primary"
              onClick={initiate}
            >
              Initiate workflow
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
