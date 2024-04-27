import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { AMS_UPDATE_ACCOUNT_ENDPOINT } from "Config/AMSEndpointConfig";
import { CountryCodeProps, CountryCodes } from "Config/CountryConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppImageUploadInput } from "DataEntryComponents/Form/AppImageUploadInput";
import { AppMaskInput } from "DataEntryComponents/Form/AppMaskInput";
import { AppSpace } from "LayoutComponents/AppSpace";
import {
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Tag,
  Typography,
  message,
  theme,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import axios from "axios";
import { Account, setAccount } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AccountPage = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const account: Account = useSelector((state: any) => state.auth.account);
  const authToken = useSelector((state: any) => state.auth.token);

  const [countryCode, setCountryCode] = useState<string>(
    CountryCodes.US.toString()
  );
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  const handleSave = () => {
    setSaveLoading(true);

    // const formData = new FormData();

    // formData.append("email", account.email);
    // formData.append("firstName", form.getFieldValue("firstName"));
    // formData.append("lastName", form.getFieldValue("lastName"));
    // formData.append("phoneNumber", form.getFieldValue("phoneNumber"));
    // formData.append(
    //   "base64Image",
    //   form.getFieldValue("profilePicture")?.[0]?.originFileObj
    // );

    const formData = {
      email: account.email,
      firstName: form.getFieldValue("firstName"),
      lastName: form.getFieldValue("lastName"),
      phoneNumber: form.getFieldValue("phoneNumber"),
      // base64Image: form.getFieldValue("profilePicture")?.[0]
      //   ?.originFileObj as Blob,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    setTimeout(async () => {
      const updatedAccount = await axios
        .post(AMS_UPDATE_ACCOUNT_ENDPOINT, formData, config)
        .then((res) => res.data?.account as Account)
        .catch((err) => {
          console.error(err);
          messageApi.error("Failed to update account.");
          return undefined;
        });
      if (updatedAccount) {
        dispatch(setAccount(updatedAccount));
        messageApi.success("Account updated successfully.");
      }

      setSaveLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        ...account,
        phoneNumber: {
          number: account.phoneNumber,
          countryCode: account.countryCode,
        },
      });
    }
  }, [account, form]);

  const handleValuesChange = (change: any, values: any) => {
    console.log(change);
    if (change && change.phoneNumber && change.phoneNumber.countryCode) {
      setCountryCode(change.phoneNumber.countryCode);
    }
    form.setFieldsValue(values);
  };

  return (
    <>
      {contextHolder}
      <AppSpace>
        <Flex vertical>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>
            Profile
          </Typography.Title>
          <Typography.Text type="secondary">
            Manage your profile settings
          </Typography.Text>
        </Flex>

        <Divider />

        <Flex vertical gap={2}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Basic Info
          </Typography.Title>
          <Typography.Text type="secondary">
            Tell us your basic info details
          </Typography.Text>
        </Flex>

        <AppForm
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          requiredMark="optional"
        >
          <Form.Item label="First name" name="firstName" required>
            <Input />
          </Form.Item>

          <Form.Item label="Last name" name="lastName" required>
            <Input />
          </Form.Item>

          <Form.Item
            label={
              <Flex align="center" gap={8}>
                <Typography.Text>Email address</Typography.Text>

                <Tag
                  color={account.isEmailVerified ? "success" : "error"}
                  icon={
                    account.isEmailVerified ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                >
                  {account.isEmailVerified ? "Verified" : "Not Verified"}
                </Tag>
              </Flex>
            }
            name="email"
            required
          >
            <Input disabled />
          </Form.Item>

          <Flex align="center">
            <Form.Item
              name={["phoneNumber", "countryCode"]}
              label="Phone number"
            >
              <Select
                style={{
                  width: 200,
                  backgroundColor: token.colorFillQuaternary,
                  borderTopLeftRadius: token.borderRadiusSM,
                  borderBottomLeftRadius: token.borderRadiusSM,
                  border: "1px solid",
                  borderRightWidth: 0,
                  borderColor: token.colorBorder,
                }}
                variant="borderless"
                options={Object.entries(CountryCodes).map(
                  ([k, v]) =>
                    ({
                      label: (
                        <Flex justify="center" align="center" gap={16}>
                          <Flex style={{ flex: 1 }} justify="flex-end">
                            <Typography.Text>{`${k} ${v.code}`}</Typography.Text>
                          </Flex>
                          <Flex style={{ flex: 1 }} justify="flex-start">
                            <span
                              style={{ borderRadius: 100 }}
                              className={`fi fi-${v.flag} fis`}
                            ></span>
                          </Flex>
                        </Flex>
                      ),
                      value: k,
                    } as DefaultOptionType)
                )}
                placeholder="Country code"
              />
            </Form.Item>
            <Form.Item
              name={["phoneNumber", "number"]}
              style={{ flex: 1, marginTop: 32 }}
            >
              <AppMaskInput
                mask={
                  CountryCodes[countryCode as keyof CountryCodeProps]?.mask ||
                  CountryCodes.US.mask
                }
                placeholder="Phone number"
                style={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
              />
            </Form.Item>
          </Flex>

          <Form.Item>
            <Divider />
          </Form.Item>

          <Form.Item label="Profile picture" name="profilePicture">
            <AppImageUploadInput />
          </Form.Item>

          <Flex justify="flex-end">
            <Form.Item>
              <AppButton
                type="primary"
                onClick={handleSave}
                loading={saveLoading}
              >
                Save
              </AppButton>
            </Form.Item>
          </Flex>
        </AppForm>
      </AppSpace>
    </>
  );
};
