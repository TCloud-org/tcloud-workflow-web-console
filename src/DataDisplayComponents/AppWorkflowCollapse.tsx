import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps, theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { dotStyle } from "./AppSurface";
import { useSelector } from "react-redux";

export const AppWorkflowCollapse = (props: {
  items: CollapseProps["items"];
  size?: SizeType;
}) => {
  const isDarkMode = useSelector((state: any) => state.general.isDarkMode);
  const { token } = theme.useToken();

  const { items = [] } = props;

  const panelDarkStyle: React.CSSProperties = {
    margin: "32px 0",
    background: `${token.colorBgContainer}99`,
    borderRadius: "12px",
    border: "1px solid rgba(206, 206, 251, .1)",
    backdropFilter: "blur(16px)",
    zIndex: 20,
  };

  const panelLightStyle: React.CSSProperties = {
    margin: "32px 0",
    background: `${token.colorBgContainer}`,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: "12px",
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
        style: isDarkMode ? panelDarkStyle : panelLightStyle,
        className: "max-w-screen-2xl w-full",
      }))}
    />
  );
};
