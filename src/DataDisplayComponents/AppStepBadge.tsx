import { Flex, Typography, theme } from "antd";

export const AppStepBadge = (props: { step?: number }) => {
  const { token } = theme.useToken();

  const { step = 1 } = props;

  return (
    <Flex>
      <div
        style={{
          padding: "2px 8px",
          backgroundColor: "black",
          borderRadius: token.borderRadius,
        }}
      >
        <Typography.Text style={{ color: token.colorWhite }} strong>
          {`STEP ${step}`}
        </Typography.Text>
      </div>
    </Flex>
  );
};
