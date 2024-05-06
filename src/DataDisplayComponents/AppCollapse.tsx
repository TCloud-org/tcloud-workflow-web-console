import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export const AppCollapse = (props: {
  items: CollapseProps["items"];
  size?: SizeType;
}) => {
  const { token } = theme.useToken();

  const { items = [] } = props;

  const panelStyle: React.CSSProperties = {
    borderRadius: token.borderRadiusLG,
  };

  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{ background: token.colorBgContainer }}
      items={items.map((item) => ({ ...item, style: panelStyle }))}
    />
  );
};
