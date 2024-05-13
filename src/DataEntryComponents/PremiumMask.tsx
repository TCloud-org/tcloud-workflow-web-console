import { LockFilled } from "@ant-design/icons";
import { Button, Flex, theme } from "antd";

export const PremiumMask = () => {
  const { token } = theme.useToken();
  return (
    <div className="absolute z-10 -top-2 -left-2 -right-2 -bottom-2 flex justify-center items-center backdrop-blur-sm bg-transparent">
      <Flex vertical gap={16} justify="center" align="center">
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: token.colorWarning }}
        >
          <LockFilled style={{ color: "white", fontSize: 24 }} />
        </div>

        <Button>Upgrade your plan</Button>
      </Flex>
    </div>
  );
};
