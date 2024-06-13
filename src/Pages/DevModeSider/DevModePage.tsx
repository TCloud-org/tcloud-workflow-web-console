import { Span } from "Config/DataDisplayInterface";
import {
  WOS_INITIATE_TCA_WORKFLOW_ENDPOINT,
  WOS_NOTIFY_WORKFLOW_ENDPOINT,
} from "Config/WOSEndpointConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppTag } from "DataDisplayComponents/AppTag";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { resultTypes } from "WorkflowComponents/SetupNextState";
import { Col, Divider, Form, Input, Select, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const DevModePage = () => {
  const authToken = useSelector((state: any) => state.auth.token);
  const [workId, setWorkId] = useState<string>("");

  const [initiateForm] = Form.useForm();
  const [notifyForm] = Form.useForm();

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleInitiate = async () => {
    setLoading({ initiate: true });

    const formData = {
      ...initiateForm.getFieldsValue(),
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

    setLoading({ initiate: false });
  };

  const handleNotify = async () => {
    setLoading({ notify: true });

    const formData = {
      ...notifyForm.getFieldsValue(),
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios
      .post(WOS_NOTIFY_WORKFLOW_ENDPOINT, formData, config)
      .then((_) => {})
      .catch((error) => console.error(error));

    setLoading({ notify: false });
  };

  return (
    <AppSurface type="form" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <AppSpace>
        <div className="px-4">
          <PageTitle>Development</PageTitle>
        </div>

        <AppForm
          form={initiateForm}
          layout="vertical"
          className="mx-4"
          onValuesChange={(_, values) => initiateForm.setFieldsValue(values)}
        >
          <Form.Item>
            <Typography.Text strong>Initiate workflow</Typography.Text>
          </Form.Item>

          {workId && (
            <Form.Item>
              <AppTag className="p-2">
                Work ID:{" "}
                <Typography.Link
                  href={`/live/${encodeURIComponent(workId)}`}
                  target="_blank"
                >
                  {workId}
                </Typography.Link>
              </AppTag>
            </Form.Item>
          )}

          <Form.Item label="WORKFLOW ID" name="workflowId">
            <Input />
          </Form.Item>

          <Form.Item noStyle>
            <AppButton
              loading={loading["initiate"]}
              type="primary"
              onClick={handleInitiate}
            >
              Initiate
            </AppButton>
          </Form.Item>
        </AppForm>

        <Divider />

        <AppForm
          form={notifyForm}
          layout="vertical"
          className="mx-4"
          onValuesChange={(_, values) => notifyForm.setFieldsValue(values)}
        >
          <Form.Item>
            <Typography.Text strong>Notify workflow</Typography.Text>
          </Form.Item>

          <Form.Item label="WORK ID" name="workId">
            <Input />
          </Form.Item>

          <AppRow gutter={[16, 16]}>
            <Col {...Span[2]}>
              <Form.Item
                label="TYPE"
                name={["stateNotification", "resultType"]}
              >
                <Select options={resultTypes} />
              </Form.Item>
            </Col>

            <Col {...Span[2]}>
              <Form.Item
                label="NAME"
                name={["stateNotification", "resultName"]}
              >
                <Input />
              </Form.Item>
            </Col>
          </AppRow>

          <Form.Item>
            <AppButton
              loading={loading["notify"]}
              type="primary"
              onClick={handleNotify}
            >
              Notify
            </AppButton>
          </Form.Item>
        </AppForm>
      </AppSpace>
    </AppSurface>
  );
};
