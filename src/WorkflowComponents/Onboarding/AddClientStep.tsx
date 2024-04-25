import { Client } from "Config/SCSConfig";
import { SCS_ADD_CLIENT_URL } from "Config/SCSEndpointConfig";
import { getClients } from "Network/SecurityFetch";
import { Flex, Form, Select } from "antd";
import axios from "axios";
import { Account } from "features/auth/authSlice";
import { updateClients } from "features/workflow/clientSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StepContentProps } from "../../Config/DataDisplayInterface";
import { AppStepContentBox } from "../../DataDisplayComponents/AppStepContentBox";
import { AppForm } from "../../DataEntryComponents/AppForm";
import { AppSelectAddDropdown } from "../../DataEntryComponents/AppSelectAddDropdown";

export const AddClientStep = (props: StepContentProps) => {
  const { form, formData, stepKey } = props;
  const dispatch = useDispatch();

  const account: Account = useSelector((state: any) => state.auth.account);
  const clients: Client[] = useSelector((state: any) => state.client.clients);

  const [fetchingClients, setFetchingClients] = useState<boolean>(false);

  const fetchClients = async () => {
    if (account && account.email) {
      setFetchingClients(true);

      const res = await getClients(account.email);
      dispatch(updateClients(res.clients));

      setFetchingClients(false);
    }
  };

  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        ...formData[stepKey],
      });
    }
  }, [formData, form, stepKey]);

  const handleAddNewClient = (name: string) => {
    const req = {
      client: {
        clientId: name,
      },
      invitees: [
        {
          clientId: name,
          inviteeEmail: account.email,
          permission: "ADMIN",
        },
      ],
    };
    axios.post(SCS_ADD_CLIENT_URL, req).then((_) => fetchClients());
  };

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
            label="Client"
            name="clientId"
            rules={[
              { required: true, message: "Please enter or select a client" },
            ]}
          >
            <Select
              options={clients.map((client) => ({
                label: client.clientId,
                value: client.clientId,
              }))}
              loading={fetchingClients}
              placeholder="Client"
              dropdownRender={(menu) => (
                <AppSelectAddDropdown
                  menu={menu}
                  buttonLabel="Add a new client"
                  inputPlaceholder="Client"
                  buttonOnClick={handleAddNewClient}
                />
              )}
            />
          </Form.Item>
        </AppForm>
      </Flex>
    </AppStepContentBox>
  );
};
