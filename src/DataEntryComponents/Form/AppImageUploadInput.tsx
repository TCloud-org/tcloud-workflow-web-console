import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { Avatar, Flex, Image, Upload, theme } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useEffect, useState } from "react";

export const AppImageUploadInput = (props: {
  value?: Array<UploadFile<any>>;
  onChange?: (e: any) => void;
}) => {
  const { token } = theme.useToken();

  const [fileList, setFileList] = useState<Array<UploadFile<any>>>([]);
  const [file, setFile] = useState<UploadFile<any>>();

  useEffect(() => {
    if (fileList.length > 0) {
      console.log(fileList[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setFile(fileList[0]);
      };
      reader.readAsDataURL(fileList[0].originFileObj as Blob);
    }
  }, [fileList]);

  const handleOnChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList.slice(-1));
  };

  return (
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
      <ImgCrop rotationSlider>
        <Upload
          name="profile"
          action="/upload.do"
          listType="picture"
          fileList={fileList}
          accept="image/png,image/jpg,image/jpeg"
          onChange={handleOnChange}
        >
          <AppButton icon={<UploadOutlined />}>Upload</AppButton>
        </Upload>
      </ImgCrop>
    </Flex>
  );
};
