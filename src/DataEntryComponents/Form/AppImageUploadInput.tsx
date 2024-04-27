import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { Avatar, Flex, Image, Typography, Upload, theme } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useState } from "react";

export const AppImageUploadInput = (props: {
  value?: Array<UploadFile<any>>;
  onChange?: (e: Array<UploadFile<any>>) => void;
}) => {
  const { token } = theme.useToken();

  const { onChange = () => {}, value = [] } = props;

  const [file, setFile] = useState<UploadFile<any>>();

  useEffect(() => {
    if (value.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(value[0]);
      };
      reader.readAsDataURL(value[0].originFileObj as Blob);
    }
  }, [value]);

  const handleOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
    onChange(info.fileList.slice(-1));
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Text type="secondary">
        We accept JPEGs (e.g., jpeg, jpg) and PNGs (e.g., png) under 5MB
      </Typography.Text>

      <Flex align="center" gap={16}>
        {file ? (
          <Image
            src={file.thumbUrl || file.url}
            alt="avatar"
            height={64}
            width={64}
            style={{ borderRadius: 100 }}
          />
        ) : (
          <Avatar
            icon={<UserOutlined />}
            size={64}
            style={{ backgroundColor: token.colorPrimary }}
          />
        )}
        <ImgCrop rotationSlider showGrid showReset cropShape="round">
          <Upload
            name="profile"
            listType="picture"
            fileList={value}
            accept="image/png,image/jpg,image/jpeg"
            onChange={handleOnChange}
          >
            <AppButton icon={<UploadOutlined />}>Upload</AppButton>
          </Upload>
        </ImgCrop>
      </Flex>
    </Flex>
  );
};
