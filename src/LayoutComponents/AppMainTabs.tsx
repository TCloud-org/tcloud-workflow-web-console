import { Tabs, TabsProps } from "antd";

export const AppMainTabs = (props: TabsProps) => {
  return <Tabs {...props} tabBarStyle={{ fontWeight: 600 }} />;
};
