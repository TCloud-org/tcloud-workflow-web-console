import { Divider, Flex, Typography } from "antd";
import { Fragment, ReactNode } from "react";
import { AppMenuLink } from "./AppMenuLink";

export interface MenuItem {
  key: string;
  label?: string | ReactNode;
  icon?: ReactNode;
  href?: string;
  children?: MenuItem[];
  type?: string;
}

export interface AppMenuProps {
  items?: MenuItem[];
}

export const AppMenu = (props: AppMenuProps) => {
  const { items = [] } = props;

  const renderContent = (item: MenuItem, i: number): ReactNode => {
    if (item.type === "group") {
      return (
        <Fragment key={`${item.key}-${i}`}>
          {i > 0 && <Divider style={{ margin: 0 }} />}
          <Flex vertical gap={8}>
            <Typography.Text strong className="text-slate-600 mx-4">
              {item.label?.toString().toUpperCase()}
            </Typography.Text>

            {item.children?.map((child, j) => renderContent(child, j))}
          </Flex>
        </Fragment>
      );
    }

    return <AppMenuLink item={item} key={`${item.key}-${i}`} />;
  };

  return (
    <Flex vertical gap={8} className="py-4 overflow-auto">
      {items.map((item, i) => renderContent(item, i))}
    </Flex>
  );
};
