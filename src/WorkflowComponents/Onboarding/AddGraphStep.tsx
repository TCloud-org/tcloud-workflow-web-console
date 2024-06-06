import { Alert, Col, Form, Input, InputNumber } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { StepContentProps } from "../../Config/DataDisplayInterface";
import { WOS_VALIDATE_XML_WORKFLOW_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { AppStepContentBox } from "../../DataDisplayComponents/AppStepContentBox";
import { AppSurface } from "../../DataDisplayComponents/AppSurface";
import {
  CodeTheme,
  XMLCodeEditor,
} from "../../DataDisplayComponents/XMLCodeEditor";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { DarkLightModeSwitch } from "../../DataEntryComponents/DarkLightModeSwitch";
import { AppRow } from "../../LayoutComponents/AppRow";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { useSelector } from "react-redux";

export const AddGraphStep = (props: StepContentProps) => {
  const { form, formData, stepKey } = props;

  const authToken = useSelector((state: any) => state.auth.token);

  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isXMLValidated, setIsXMLValidated] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [codeTheme, setCodeTheme] = useState<CodeTheme>("light");

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData[stepKey],
      });
    }
  }, [formData, form, stepKey]);

  useEffect(() => {
    if (form) {
      form.setFieldsValue({ version: 1 });
    }
  }, [form]);

  const handleCodeChange = (value: string) => {
    form.setFieldsValue({
      xmlContent: value,
    });
  };

  const handleValidate = async () => {
    if (!form.getFieldValue("xmlContent")) {
      return;
    }

    setIsValidating(true);

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios
      .post(
        WOS_VALIDATE_XML_WORKFLOW_ENDPOINT,
        {
          xml: form.getFieldValue("xmlContent"),
        },
        config
      )
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

  const handleDarkLightModeSwitch = (isLightMode: boolean) => {
    if (isLightMode) {
      setCodeTheme("light");
    } else {
      setCodeTheme("dark");
    }
  };

  return (
    <AppStepContentBox title="Graph">
      <AppForm form={form}>
        <Form.Item
          label="Alias"
          name="alias"
          tooltip="If this field is left empty, it will be automatically assigned a generated ID"
        >
          <Input placeholder="Enter an alias" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          tooltip="This description offers helpful context for this graph version"
        >
          <Input.TextArea placeholder="Enter a description" />
        </Form.Item>
        <Form.Item label="Version" name="version" tooltip="Next version">
          <InputNumber style={{ width: "100%" }} disabled />
        </Form.Item>

        <Form.Item name="xmlContent" style={{ display: "none" }}>
          <div></div>
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
              <AppButton loading={isValidating} onClick={handleValidate}>
                Validate
              </AppButton>
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
        value={form.getFieldValue("xmlContent")}
        theme={codeTheme}
        onChange={handleCodeChange}
      />
    </AppStepContentBox>
  );
};
