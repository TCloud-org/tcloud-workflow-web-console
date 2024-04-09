import { Col, Form, FormInstance, Input, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { Graph } from "../../Config/WorkflowConfig";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppRow } from "../../LayoutComponents/AppRow";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";
import { WorkflowModal } from "../WorkflowModal";
import { useState } from "react";

export const BatchRerunConfigureWorkflowStep = (props: {
  form: FormInstance<any>;
  graphs: Graph[];
}) => {
  const { form, graphs = [] } = props;

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <AppVerticalStepContent>
        <AppForm form={form} layout="vertical">
          <AppRow>
            <Col span={10}>
              <Form.Item label="Workflow" name="workflowName">
                <Input style={{ width: "171.5%" }} disabled />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label="Alias"
                name={["workflowVersionConfig", "alias"]}
              >
                <Select
                  options={graphs.map(
                    (graph) =>
                      ({
                        value: graph.alias,
                        label: graph.alias,
                      } as DefaultOptionType)
                  )}
                  style={{ width: "171.5%" }}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label=" ">
                <AppButton
                  onClick={() => setModalOpen(true)}
                  style={{ width: "171.5%" }}
                >
                  View graph
                </AppButton>
              </Form.Item>
            </Col>
          </AppRow>
        </AppForm>
      </AppVerticalStepContent>
      <WorkflowModal
        open={modalOpen}
        alias={form.getFieldValue("workflowVersionConfig")?.alias}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
