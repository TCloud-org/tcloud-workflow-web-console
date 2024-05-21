import { Tabs, TabsProps } from "antd";
import { useLocation } from "react-router-dom";

export const AppMainTabs = (
  props: TabsProps & {
    tabIndexKey?: string;
  }
) => {
  const { tabIndexKey = "tab" } = props;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabIndex = searchParams.get(tabIndexKey) || props.defaultActiveKey;

  const handleTabChange = (activeKey: string) => {
    searchParams.set(tabIndexKey, activeKey);
    window.location.href = `${location.pathname}?${searchParams}`;
  };

  return (
    <Tabs
      {...props}
      activeKey={tabIndex}
      onChange={handleTabChange}
      tabBarStyle={{ fontWeight: 600 }}
      animated={false}
    />
  );
};
