import { Tabs } from "antd";
import { TabItem } from "../Config/DataDisplayInterface";

export const AppCardTabs = (props: {
  size?: "large" | "middle" | "small";
  items?: TabItem[];
}) => {
  const { size, items } = props;
  return <Tabs defaultActiveKey="1" type="card" size={size} items={items} />;
};
