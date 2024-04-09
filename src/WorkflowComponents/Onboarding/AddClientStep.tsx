import { Flex, Form, Select } from "antd";
import { StepContentProps } from "../../Config/DataDisplayInterface";
import { AppStepContentBox } from "../../DataDisplayComponents/AppStepContentBox";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSelectAddDropdown } from "../../DataEntryComponents/AppSelectAddDropdown";
import { useEffect } from "react";

export const AddClientStep = (props: StepContentProps) => {
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
    <AppStepContentBox title="Client">
      <Flex justify="center">
        <AppForm
          form={form}
          style={{ width: "100%" }}
          name="validate"
          onValuesChange={handleValuesChange}
        >
          <Form.Item
            label="Client ID"
            name="clientId"
            rules={[
              { required: true, message: "Please enter or select a client ID" },
            ]}
          >
            <Select
              options={[{ value: "admin", label: "admin" }]}
              placeholder="Select or create a client"
              dropdownRender={(menu) => (
                <AppSelectAddDropdown
                  menu={menu}
                  buttonLabel="Add a new client"
                  inputPlaceholder="Enter a new client ID"
                />
              )}
            />
          </Form.Item>
        </AppForm>
      </Flex>
    </AppStepContentBox>
  );
};
