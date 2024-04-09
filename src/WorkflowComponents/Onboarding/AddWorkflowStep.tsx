import { Flex, Form, Input } from "antd";
import { StepContentProps } from "../../Config/DataDisplayInterface";
import { AppStepContentBox } from "../../DataDisplayComponents/AppStepContentBox";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { useEffect } from "react";

export const AddWorkflowStep = (props: StepContentProps) => {
  const { form, formData, stepKey } = props;

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData[stepKey],
      });
    }
  }, [formData, form, stepKey]);

  const handleValuesChange = (e: any) => {
    form.setFieldsValue(e);
  };

  return (
    <AppStepContentBox title="Workflow">
      <Flex justify="center">
        <AppForm
          form={form}
          style={{ width: "100%" }}
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            label="Workflow name"
            name="workflowName"
            rules={[
              { required: true, message: "Please enter a workflow name" },
            ]}
          >
            <Input placeholder="Enter a workflow name" />
          </Form.Item>
        </AppForm>
      </Flex>
    </AppStepContentBox>
  );
};
