import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { CountryCodeProps, CountryCodes } from "Config/CountryConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppImageUploadInput } from "DataEntryComponents/Form/AppImageUploadInput";
import { AppMaskInput } from "DataEntryComponents/Form/AppMaskInput";
import { AppSpace } from "LayoutComponents/AppSpace";
import {
  Avatar,
  Divider,
  Flex,
  Form,
  Input,
  Select,
  Tag,
  Typography,
  Upload,
  theme,
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import { Account } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AccountPage = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const account: Account = useSelector((state: any) => state.auth.account);

  const [countryCode, setCountryCode] = useState<string>(
    CountryCodes.US.toString()
  );

  const handleSave = () => {
    console.log(form.getFieldsValue());
  };

  useEffect(() => {
    if (account) {
      form.setFieldsValue({ ...account });
    }
  }, [account, form]);

  const handleValuesChange = (change: any, values: any) => {
    if (change && change.phoneNumber && change.phoneNumber.countryCode) {
      setCountryCode(change.phoneNumber.countryCode);
    }
    form.setFieldsValue(values);
  };

  return (
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
          <Form.Item name={["phoneNumber", "countryCode"]} label="Phone number">
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

        <Form.Item label="Profile picture">
          <Flex vertical gap={16}>
            <Typography.Text type="secondary">
              We accept JPEGs (e.g., jpeg, jpg) and PNGs (e.g., png) under 5MB
            </Typography.Text>
            <AppImageUploadInput />
          </Flex>
        </Form.Item>

        <Flex justify="flex-end">
          <Form.Item>
            <AppButton type="primary" onClick={handleSave}>
              Save
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
