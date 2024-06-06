import { Breadcrumb, Typography } from "antd";
import { useSelector } from "react-redux";
import { BreadcrumbItem } from "../features/navigation/breadcrumbSlice";

export const AppBreadcrumb = () => {
  const items: BreadcrumbItem[] = useSelector(
    (state: any) => state.breadcrumb.items
  );

  return (
    <Breadcrumb
      style={{ margin: "16px" }}
      items={items.map((item, i) => ({
        ...item,
        title:
          i === items.length - 1 ? (
            <Typography.Text strong>{item.title}</Typography.Text>
          ) : (
            item.title
          ),
      }))}
    />
  );
};
