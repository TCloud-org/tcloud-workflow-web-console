import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

export const AppCollapse = (props: {
  items: CollapseProps["items"];
  size?: SizeType;
}) => {
  const { token } = theme.useToken();

  const { items = [] } = props;

  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      bordered={false}
      style={{ background: token.colorBgContainer }}
      items={items.map((item) => ({
        ...item,
        className: "glass-bar",
      }))}
    />
  );
};
