import { Flex, Typography, message } from "antd";
import { useState } from "react";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppSurface } from "./AppSurface";

const defaultMask = 0.1;
export const AppSecretDescription = (props: {
  children: string;
  mask?: number;
}) => {
  const { children, mask = defaultMask } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const [reveal, setReveal] = useState<boolean>(false);

  const maskSize = parseInt((children.length * mask).toString());
  const maskedText =
    children.substring(0, maskSize) + "•".repeat(children.length - maskSize);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(children)
      .then(() => {
        messageApi.success("Secret key copied to clipboard");
      })
      .catch((_) => {});
  };

  return (
    <>
      {contextHolder}
      <AppSurface>
        <AppSpace>
          <Typography.Text>{reveal ? children : maskedText}</Typography.Text>
          <Flex align="center" gap={8}>
            <AppButton
              onClick={() => setReveal((prev) => !prev)}
              type={reveal ? "primary" : "default"}
            >
              Reveal Key
            </AppButton>
            <AppButton onClick={handleCopy}>Copy Key</AppButton>
          </Flex>
        </AppSpace>
      </AppSurface>
    </>
  );
};
