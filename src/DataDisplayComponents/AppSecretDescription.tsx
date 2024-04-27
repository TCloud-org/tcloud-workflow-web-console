import { Typography, message, theme } from "antd";
import { AppSurface } from "./AppSurface";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppButton } from "../DataEntryComponents/AppButton";
import { useState } from "react";

const defaultMask = 0.1;
export const AppSecretDescription = (props: {
  children: string;
  mask?: number;
}) => {
  const { token } = theme.useToken();
  const { children, mask = defaultMask } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const buttonStyle = { fontWeight: 600, color: token.colorPrimary };

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
        <AppSpace direction="horizontal">
          <Typography.Text>{reveal ? children : maskedText}</Typography.Text>
          <AppSpace direction="horizontal" size="small">
            <AppButton
              onClick={() => setReveal((prev) => !prev)}
              style={buttonStyle}
            >
              Reveal Key
            </AppButton>
            <AppButton onClick={handleCopy} style={buttonStyle}>
              Copy Key
            </AppButton>
          </AppSpace>
        </AppSpace>
      </AppSurface>
    </>
  );
};
