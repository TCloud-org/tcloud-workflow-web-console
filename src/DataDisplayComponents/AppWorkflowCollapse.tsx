import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { dotStyle } from "./AppSurface";

export const AppWorkflowCollapse = (props: {
  items: CollapseProps["items"];
  size?: SizeType;
}) => {
  const { token } = theme.useToken();

  const { items = [] } = props;

  const panelStyle: React.CSSProperties = {
    margin: "32px 0",
    background: token.colorWhite,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    border: "none",
  };

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        ...dotStyle,
        padding: 128,
      }}
      items={items.map((item) => ({ ...item, style: panelStyle }))}
    />
  );
};
