import { LinkOutlined } from "@ant-design/icons";
import { List } from "antd";
import { CSSProperties, ReactNode } from "react";
import { ListItem } from "../Config/DataDisplayInterface";
import { AppHeading } from "./AppHeading";
import { ListItemLayout } from "antd/es/list";

export const AppList = (props: {
  data?: ListItem[];
  header?: string;
  onReload?: () => void;
  loading?: boolean;
  headerEndDecorator?: ReactNode;
  style?: CSSProperties;
  headerTooltip?: string;
  headerSurface?: boolean;
  itemLayout?: ListItemLayout;
}) => {
  const {
    data = [],
    header,
    headerTooltip,
    onReload,
    loading,
    headerEndDecorator,
    style,
    headerSurface = true,
    itemLayout,
  } = props;
  return (
    <List
      itemLayout={itemLayout}
      header={
        <AppHeading
          surface={headerSurface}
          tooltip={headerTooltip}
          onReload={onReload}
          endDecorator={headerEndDecorator}
        >
          {header}
        </AppHeading>
      }
      style={style}
      pagination={{
        showSizeChanger: true,
        defaultPageSize: 10,
        showQuickJumper: true,
        pageSizeOptions: [5, 10, 25, 50, 100],
      }}
      dataSource={data}
      loading={loading}
      renderItem={(item: any, _) => (
        <List.Item>
          <List.Item.Meta
            avatar={<LinkOutlined />}
            title={<a href={item.href}>{item.title}</a>}
          />
        </List.Item>
      )}
    />
  );
};
