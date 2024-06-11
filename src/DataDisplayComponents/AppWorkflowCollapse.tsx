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
    background: `${token.colorBgContainer}33`,
    borderRadius: "12px",
    boxShadow: "rgba(206, 206, 251, 0.1) 0px 0px 16.3056px 0px inset",
    border: "1px solid rgba(206, 206, 251, .1)",
    backdropFilter: "blur(16px)",
    zIndex: 20,
  };

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{
        ...dotStyle,
      }}
      className="p-2 md:p-10 lg:p-20 flex flex-col items-center"
      items={items.map((item) => ({
        ...item,
        style: panelStyle,
        className: "max-w-screen-2xl w-full",
      }))}
    />
  );
};
