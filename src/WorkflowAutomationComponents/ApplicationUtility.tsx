import { Utility } from "Config/AutomationConfig";
import { Flex, Typography, theme } from "antd";
import { CSSProperties, ReactElement, cloneElement } from "react";
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
    <Flex>
      <Flex
        justify="center"
        gap={16}
        onClick={handleClick}
        style={{ cursor: "pointer", transition: "all 0.3s" }}
        className="hover:bg-slate-300/10 p-4 rounded-md"
      >
        <Flex align="flex-start">
          <div
            style={{
              backgroundColor: token.colorFillTertiary,
              borderRadius: token.borderRadiusLG,
            }}
            className="px-3 py-2"
          >
            {cloneElement(utility.icon as ReactElement, {
              style: {
                fontSize: "inherit",
                color: token.colorPrimary,
              } as CSSProperties,
            })}
          </div>
        </Flex>
        <Flex vertical>
          <Typography.Text strong style={{ color: token.colorPrimary }}>
            {utility.label}
          </Typography.Text>

          <Typography.Paragraph style={{ margin: 0 }}>
            {utility.description}
          </Typography.Paragraph>
        </Flex>
      </Flex>
    </Flex>
  );
};
