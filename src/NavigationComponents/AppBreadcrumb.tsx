import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { BreadcrumbItem } from "../features/navigation/breadcrumbSlice";

export const AppBreadcrumb = () => {
  const items: BreadcrumbItem[] = useSelector(
    (state: any) => state.breadcrumb.items
  );

  return <Breadcrumb style={{ margin: "16px 0" }} items={items} />;
};
