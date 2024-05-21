import { Utility } from "Config/AutomationConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { Flex, Typography, theme } from "antd";
import { ReactElement, cloneElement } from "react";
import { useNavigate } from "react-router-dom";

export const ApplicationUtility = (props: { utility: Utility }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const { utility } = props;

  const handleClick = () => {
    if (utility.href) {
      navigate(utility.href);
    }
  };

  return (
    <AppCard onClick={handleClick} style={{ cursor: "pointer" }}>
      <Flex vertical justify="center" gap={16}>
        <Flex justify="flex-start">
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: token.colorPrimary,
              borderRadius: token.borderRadiusLG,
            }}
          >
            {cloneElement(utility.icon as ReactElement, {
              style: { fontSize: 14, color: token.colorWhite },
            })}
          </div>
        </Flex>
        <Typography.Text strong>{utility.label}</Typography.Text>
      </Flex>
    </AppCard>
  );
};
