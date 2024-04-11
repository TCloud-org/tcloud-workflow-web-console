import { Utility } from "Config/AutomationConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

export const ApplicationUtility = (props: { utility: Utility }) => {
  const navigate = useNavigate();

  const { utility } = props;

  const handleClick = () => {
    if (utility.href) {
      navigate(utility.href);
    }
  };

  return (
    <Flex
      vertical
      align="center"
      wrap="wrap"
      gap="8px"
      style={{
        width: 120,
        textAlign: "center",
        padding: "16px",
        cursor: "pointer",
      }}
      className="hover"
      onClick={handleClick}
    >
      <AppSurface>{utility.icon}</AppSurface>
      <Typography.Text style={{ fontSize: "small" }}>
        {utility.label}
      </Typography.Text>
    </Flex>
  );
};
