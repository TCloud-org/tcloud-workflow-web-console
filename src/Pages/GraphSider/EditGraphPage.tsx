import { Alert, Flex, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GENERATED_ID_INPUT_TOOLTIP,
  Span,
} from "../../Config/DataDisplayInterface";
import { Graph } from "../../Config/WorkflowConfig";
import { XMLCodeEditor } from "../../DataDisplayComponents/XMLCodeEditor";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { useSelector } from "react-redux";
import axios from "axios";
import { WOS_ADD_GRAPH_ENDPOINT } from "../../Config/WOSEndpointConfig";

export const EditGraphPage = () => {
  const navigate = useNavigate();

  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);

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

    await axios
      .post(WOS_ADD_GRAPH_ENDPOINT, params)
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
    <AppSpace>
      {failedValidation && (
        <Alert message="Graph validation failed" type="error" showIcon />
      )}
      <AppForm
        form={form}
        onValuesChange={handleValuesChange}
        labelCol={Span[8]}
        wrapperCol={Span[1]}
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
        <Form.Item name="xmlContent" label="Graph XML">
          <XMLCodeEditor
            style={{ width: "100%" }}
            value={form.getFieldValue("xmlContent")}
          />
        </Form.Item>
      </AppForm>
      <Flex justify="center">
        <AppButton loading={loading} onClick={handleEdit} type="primary">
          Edit
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
