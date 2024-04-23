import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Form, Input } from "antd";

export const AddClientPage = () => {
  return (
    <AppSpace>
      <PageTitle>Add Client</PageTitle>
      <AppForm>
        <Form.Item label="Client" name="client">
          <Input />
        </Form.Item>
        <Form.Item>
          <AppButton type="primary">Add</AppButton>
        </Form.Item>
      </AppForm>
    </AppSpace>
  );
};
