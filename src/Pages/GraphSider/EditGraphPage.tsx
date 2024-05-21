import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppCodeInput } from "DataEntryComponents/Form/AppCodeInput";
import { Alert, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GENERATED_ID_INPUT_TOOLTIP,
  createSpan,
} from "../../Config/DataDisplayInterface";
import { WOS_ADD_GRAPH_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { Graph } from "../../Config/WorkflowConfig";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";

export const EditGraphPage = () => {
  const navigate = useNavigate();

  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const location = useLocation();
  const {
    graph,
    nextAvailableVersion,
  }: { graph: Graph; nextAvailableVersion: number } = location.state || {};

  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [failedValidation, setFailedValidation] = useState<boolean>(false);

  useEffect(() => {
    if (graph) {
      form.setFieldsValue({
        alias: graph.alias,
        description: graph.description,
        xmlContent: graph.xmlContent,
        version: graph.version,
      });
    }
  }, [graph, nextAvailableVersion, form]);

  const handleValuesChange = (e: any) => {
    if (e.xmlContent) {
      if (e.xmlContent !== graph.xmlContent) {
        form.setFieldsValue({
          version: nextAvailableVersion,
        });
      } else {
        form.setFieldsValue({
          version: graph.version,
        });
      }
    }
    form.setFieldsValue(e);
  };

  const handleEdit = async () => {
    setLoading(true);

    const params = {
      graphId:
        form.getFieldValue("xmlContent") === graph.xmlContent
          ? graph.graphId
          : null,
      clientId,
      workflowId,
      ...form.getFieldsValue(),
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await axios
      .post(WOS_ADD_GRAPH_ENDPOINT, params, config)
      .then((_) => {
        setLoading(false);
        navigate(`/graph/${graph.graphId}`);
      })
      .catch((_) => {
        setFailedValidation(true);
        setLoading(false);
      });
  };

  return (
    <AppSurface type="form">
      <PageTitle>Edit graph</PageTitle>
      <AppSpace>
        {failedValidation && (
          <Alert message="Graph validation failed" type="error" showIcon />
        )}
        <AppForm
          form={form}
          onValuesChange={handleValuesChange}
          labelCol={createSpan(4)}
          wrapperCol={createSpan(20)}
        >
          <Form.Item
            name="alias"
            label="Alias"
            tooltip={GENERATED_ID_INPUT_TOOLTIP}
          >
            <Input placeholder="Enter an alias" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            tooltip="This description offers helpful context for this graph version"
          >
            <Input.TextArea placeholder="Enter a description" />
          </Form.Item>
          <Form.Item
            name="version"
            label="Version"
            tooltip="Next available version"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="xmlContent" label="Graph">
            <AppCodeInput />
          </Form.Item>

          <Form.Item noStyle>
            <AppButton loading={loading} onClick={handleEdit} type="primary">
              Edit
            </AppButton>
          </Form.Item>
        </AppForm>
      </AppSpace>
    </AppSurface>
  );
};
