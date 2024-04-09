import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

const SizeMapping: { [key: string]: string } = {
  small: "8px",
  middle: "16px",
  large: "24px",
};

export const AppCollapse = (props: {
  items: CollapseProps["items"];
  size?: SizeType;
}) => {
  const { token } = theme.useToken();

  const { items = [], size = "middle" } = props;

  const panelStyle: React.CSSProperties = {
    marginBottom: SizeMapping[size],
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{ background: token.colorBgContainer }}
      items={items.map((item) => ({ ...item, style: panelStyle }))}
    />
  );
};
