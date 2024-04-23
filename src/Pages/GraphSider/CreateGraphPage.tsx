import {
  Alert,
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Typography,
} from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputEvent } from "../../Config/DataEntryConfig";
import {
  WOS_ADD_GRAPH_ENDPOINT,
  WOS_VALIDATE_XML_WORKFLOW_ENDPOINT,
} from "../../Config/WOSEndpointConfig";
import { GetGraphsByWorkflowIdOutput } from "../../Config/WorkflowConfig";
import {
  CodeTheme,
  XMLCodeEditor,
} from "../../DataDisplayComponents/XMLCodeEditor";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { fetchGraphsById } from "../../Network/WorkflowFetch";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import { DarkLightModeSwitch } from "../../DataEntryComponents/DarkLightModeSwitch";
import { AppRow } from "../../LayoutComponents/AppRow";

export const CreateGraphPage = () => {
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isXMLValidated, setIsXMLValidated] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    [key: string]: string | number | undefined;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [codeTheme, setCodeTheme] = useState<CodeTheme>("light");

  const fetchGraphs = useCallback(() => {
    fetchGraphsById(workflowId).then(
      (response: GetGraphsByWorkflowIdOutput | undefined) => {
        setFormData((prev) => ({
          ...prev,
          version: response?.nextAvailableVersion || 1,
        }));
      }
    );
  }, [workflowId]);

  useEffect(() => {
    fetchGraphs();
  }, [fetchGraphs]);

  const handleCodeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, xmlContent: value }));
  };

  const handleValidate = async () => {
    if (!formData.xmlContent) {
      return;
    }
    setIsValidating(true);

    await axios
      .post(WOS_VALIDATE_XML_WORKFLOW_ENDPOINT, { xml: formData.xmlContent })
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

  const handleInputChange = (e: InputEvent) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreate = async () => {
    setLoading(true);

    const params = {
      workflowId,
      clientId,
      ...formData,
    };
    await axios
      .post(WOS_ADD_GRAPH_ENDPOINT, params)
      .then((_) => {
        navigate("/graph");
      })
      .catch((_) => {});

    setLoading(false);
  };

  const handleDarkLightModeSwitch = (isLightMode: boolean) => {
    if (isLightMode) {
      setCodeTheme("light");
    } else {
      setCodeTheme("dark");
    }
  };

  return (
    <AppSpace>
      <Flex justify="center">
        <Typography.Title level={4}>Create a new graph</Typography.Title>
      </Flex>
      <AppForm>
        <Form.Item
          label="Alias"
          name="alias"
          tooltip="If this field is left empty, it will be automatically assigned a generated ID"
        >
          <Input
            name="alias"
            value={formData["alias"]}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          tooltip="This description offers helpful context for this graph version"
        >
          <Input.TextArea
            name="description"
            value={formData["description"]}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item
          label="Version"
          name="version"
          valuePropName="1"
          tooltip="Next available version"
        >
          <InputNumber
            style={{ width: "100%" }}
            disabled
            value={formData.version}
          />
        </Form.Item>
      </AppForm>

      <AppSurface>
        <AppRow style={{ alignItems: "center" }}>
          <Col span={8} />

          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AppSpace direction="horizontal" style={{ flexGrow: 1 }}>
              <Button loading={isValidating} onClick={handleValidate}>
                Validate
              </Button>
            </AppSpace>
          </Col>

          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AppSpace direction="horizontal" style={{ flexGrow: 1 }}>
              <DarkLightModeSwitch onChange={handleDarkLightModeSwitch} />
            </AppSpace>
          </Col>
        </AppRow>
      </AppSurface>
      {showAlert && isXMLValidated ? (
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
      ) : null}
      <XMLCodeEditor
        theme={codeTheme}
        onChange={handleCodeChange}
        style={{ width: "100%" }}
      />

      <Flex justify="center">
        <AppButton
          disabled={!isXMLValidated}
          type="primary"
          tooltip={isXMLValidated ? undefined : "Validate your graph first"}
          onClick={handleCreate}
          loading={loading}
        >
          Create
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
