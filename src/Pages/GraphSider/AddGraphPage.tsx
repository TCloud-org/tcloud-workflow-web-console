import { Span } from "Config/DataDisplayInterface";
import { Client } from "Config/SCSConfig";
import {
  AppCodeInput,
  GraphFormatType,
} from "DataEntryComponents/Form/AppCodeInput";
import { AppRow } from "LayoutComponents/AppRow";
import { getClients } from "Network/SecurityFetch";
import { Alert, Col, Form, Input, InputNumber, Select, Typography } from "antd";
import axios from "axios";
import { Account } from "features/auth/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  WOS_ADD_GRAPH_ENDPOINT,
  WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT,
  WOS_VALIDATE_XML_WORKFLOW_ENDPOINT,
} from "../../Config/WOSEndpointConfig";
import {
  GetGraphsByWorkflowIdOutput,
  Workflow,
} from "../../Config/WorkflowConfig";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { fetchGraphsById } from "../../Network/WorkflowFetch";

export const CreateGraphPage = () => {
  const [form] = Form.useForm();
  const [graphForm] = Form.useForm();
  const navigate = useNavigate();
  const authToken = useSelector((state: any) => state.auth.token);
  const account: Account = useSelector((state: any) => state.auth.account);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isXMLValidated, setIsXMLValidated] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState<string>("");
  const [workflowId, setWorkflowId] = useState<number>();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const fetchGraphs = useCallback(() => {
    if (workflowId) {
      fetchGraphsById(workflowId, authToken).then(
        (response: GetGraphsByWorkflowIdOutput | undefined) => {
          form.setFieldValue("version", response?.nextAvailableVersion || 1);
        }
      );
    }
  }, [workflowId, form, authToken]);

  const fetchClients = useCallback(async () => {
    if (account) {
      const res = await getClients(account.email);
      setClients(res.clients || []);
    }
  }, [account]);

  const fetchWorkflows = useCallback(async () => {
    if (clientId) {
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      const workflows = await axios
        .get(
          `${WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`,
          config
        )
        .then((response) => response.data.workflows as Workflow[]);
      setWorkflows(workflows);
    }
  }, [clientId, authToken]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const handleValidate = async () => {
    const xmlContent = form.getFieldValue("xmlContent");
    if (!xmlContent) {
      return;
    }
    setIsValidating(true);

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios
      .post(WOS_VALIDATE_XML_WORKFLOW_ENDPOINT, { xml: xmlContent }, config)
      .then((response) => {
        setIsXMLValidated(response.data?.isValidated || false);
      })
      .catch((_) => {
        setIsXMLValidated(false);
      });

    setShowAlert(true);
    setIsValidating(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCreate = async () => {
    setLoading(true);

    const graphFormat = graphForm.getFieldValue("graphFormat") || {};
    const params = {
      ...form.getFieldsValue(),
      graphFormat: {
        type: graphFormat.type || GraphFormatType.XML_GRAPH_FORMAT,
        ...graphFormat[graphFormat.type || GraphFormatType.XML_GRAPH_FORMAT],
      },
      workflow: undefined,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios
      .post(WOS_ADD_GRAPH_ENDPOINT, params, config)
      .then((_) => {
        navigate("/step-workflow");
      })
      .catch((_) => {});

    setLoading(false);
  };

  const handleValuesChange = (change: any, values: any) => {
    if (change.clientId) {
      setClientId(change.clientId);
      setWorkflowId(undefined);
      values.workflowId = undefined;
      values.version = undefined;
    }
    if (change.workflowId) {
      setWorkflowId(change.workflowId);
    }

    form.setFieldsValue(values);
  };

  const handleGraphFormValuesChange = (_: any, values: any) => {
    graphForm.setFieldsValue(values);
  };

  return (
    <AppSpace>
      <Typography.Title level={4}>Create a new graph</Typography.Title>
      <AppForm
        form={form}
        onValuesChange={handleValuesChange}
        layout="vertical"
      >
        <AppRow gutter={[16, 16]}>
          <Col {...Span[2]}>
            <Form.Item label="Client" name="clientId">
              <Select
                options={clients.map((client) => ({
                  label: client.clientId,
                  value: client.clientId,
                }))}
                placeholder="Select a client"
              />
            </Form.Item>
          </Col>
          <Col {...Span[2]}>
            <Form.Item label="Workflow" name="workflowId">
              <Select
                options={workflows.map((workflow) => ({
                  label: workflow.workflowName,
                  value: workflow.workflowId,
                }))}
                placeholder="Select a workflow"
                disabled={!clientId}
              />
            </Form.Item>
          </Col>
        </AppRow>

        <AppRow gutter={[16, 16]}>
          <Col {...Span[2]}>
            <Form.Item
              label="Alias"
              name="alias"
              tooltip="If this field is left empty, it will be automatically assigned a generated ID"
            >
              <Input name="alias" disabled={!workflowId} />
            </Form.Item>
          </Col>
          <Col {...Span[2]}>
            <Form.Item label="Version" name="version" tooltip="Next version">
              <InputNumber style={{ width: "100%" }} disabled />
            </Form.Item>
          </Col>
        </AppRow>

        <Form.Item
          label="Description"
          name="description"
          tooltip="This description offers helpful context for this graph version"
          style={{ marginBottom: 0 }}
        >
          <Input.TextArea disabled={!workflowId} />
        </Form.Item>
      </AppForm>

      <AppForm form={graphForm} onValuesChange={handleGraphFormValuesChange}>
        <Typography.Text>Graph</Typography.Text>

        <div className="h-2" />

        <Form.Item name="graphFormat" wrapperCol={Span[1]}>
          <AppCodeInput
            showOptions
            banner={
              showAlert && isXMLValidated ? (
                <Alert
                  message="XML validated successfully"
                  type="success"
                  showIcon
                  closable
                  onClose={handleCloseAlert}
                />
              ) : showAlert && !isXMLValidated ? (
                <Alert
                  message="XML validation failed"
                  type="error"
                  showIcon
                  closable
                  onClose={handleCloseAlert}
                />
              ) : null
            }
            endDecorator={
              <AppButton
                type="text"
                onClick={handleValidate}
                loading={isValidating}
                className="hover:!bg-slate-400/10"
              >
                Validate
              </AppButton>
            }
          />
        </Form.Item>

        <Form.Item noStyle>
          <AppButton type="primary" onClick={handleCreate} loading={loading}>
            Create
          </AppButton>
        </Form.Item>
      </AppForm>
    </AppSpace>
  );
};
