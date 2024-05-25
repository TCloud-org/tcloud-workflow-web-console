import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import {
  AppCodeInput,
  GraphFormatType,
} from "DataEntryComponents/Form/AppCodeInput";
import { Alert, Form, Input, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GENERATED_ID_INPUT_TOOLTIP } from "../../Config/DataDisplayInterface";
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
  }: // nextAvailableVersion,
  { graph: Graph; nextAvailableVersion: number } = location.state || {};

  const [form] = Form.useForm();
  const [graphForm] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);
  const [failedValidation, setFailedValidation] = useState<boolean>(false);

  useEffect(() => {
    if (graph) {
      form.setFieldsValue({
        clientId: graph.clientId,
        workflowId: graph.workflowId,
        alias: graph.alias,
        description: graph.description,
        version: graph.version,
      });

      graphForm.setFieldsValue({
        graphFormat: {
          type: GraphFormatType.XML_GRAPH_FORMAT,
          [GraphFormatType.XML_GRAPH_FORMAT]: {
            xml: graph.xmlContent,
          },
          [GraphFormatType.UI_BUILDER_GRAPH_FORMAT]: {
            states: graph.graphArch?.states || [],
          },
        },
      });
    }
  }, [graph, form, graphForm]);

  const handleValuesChange = (e: any, values: any) => {
    form.setFieldsValue(values);
  };

  const handleEdit = async () => {
    setLoading(true);

    const graphFormat = graphForm.getFieldValue("graphFormat") || {};

    const params = {
      graphId: graph.graphId,
      clientId,
      workflowId,
      ...form.getFieldsValue(),
      graphFormat: {
        type: graphFormat.type || GraphFormatType.XML_GRAPH_FORMAT,
        ...graphFormat[graphFormat.type || GraphFormatType.XML_GRAPH_FORMAT],
      },
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
          layout="vertical"
          form={form}
          onValuesChange={handleValuesChange}
        >
          <Form.Item label="Client" name="clientId">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Workflow" name="workflowId">
            <Input disabled />
          </Form.Item>

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
            tooltip="Current version"
            style={{ marginBottom: 0 }}
          >
            <Input disabled />
          </Form.Item>
        </AppForm>

        <AppForm
          form={graphForm}
          onValuesChange={(_, values) => graphForm.setFieldsValue(values)}
        >
          <Typography.Text>Graph</Typography.Text>

          <div className="h-2" />

          <Form.Item name="graphFormat" noStyle>
            <AppCodeInput showOptions />
          </Form.Item>

          <div className="h-4" />

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
