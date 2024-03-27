import { LinkOutlined } from "@ant-design/icons";
import { List } from "antd";
import { TableTitle } from "./TableTitle";
import { ReactNode } from "react";
import { ListItem } from "../Config/DataDisplayInterface";

export const AppList = (props: {
  data?: ListItem[];
  header?: string;
  onReload?: () => void;
  loading?: boolean;
  headerEndDecorator?: ReactNode;
}) => {
  const { data = [], header, onReload, loading, headerEndDecorator } = props;
  return (
    <List
      header={
        <TableTitle onReload={onReload} headerEndDecorator={headerEndDecorator}>
          {header}
        </TableTitle>
      }
      pagination={{ position: "bottom", align: "end" }}
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
