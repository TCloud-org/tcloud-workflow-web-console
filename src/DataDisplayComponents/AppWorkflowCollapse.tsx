import { Collapse, CollapseProps, theme } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useSelector } from "react-redux";

export const AppWorkflowCollapse = (props: {
  items: CollapseProps["items"];
  size?: SizeType;
  className?: string;
}) => {
  const isDarkMode = useSelector((state: any) => state.general.isDarkMode);
  const { token } = theme.useToken();

  const { items = [], className = "" } = props;

  const panelDarkStyle: React.CSSProperties = {
    background: `${token.colorBgContainer}99`,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: "12px",
    border: "1px solid rgba(206, 206, 251, .15)",
    zIndex: 20,
  };

  const panelLightStyle: React.CSSProperties = {
    background: `${token.colorBgContainer}`,
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: "12px",
    zIndex: 20,
  };

  return (
    <Collapse
      bordered={false}
      expandIconPosition="end"
      className={`flex flex-col w-full mb-6 p-[2px] bg-transparent ${className} collapse-divider`}
      items={items.map((item) => ({
        ...item,
        style: isDarkMode ? panelDarkStyle : panelLightStyle,
        className: "max-w-screen-2xl w-full",
      }))}
    />
  );
};
