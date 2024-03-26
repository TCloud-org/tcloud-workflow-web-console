import { LinkOutlined } from "@ant-design/icons";
import { List } from "antd";
import { TableTitle } from "./TableTitle";

export const AppList = (props: {
  data?: any[];
  header?: string;
  onReload?: () => void;
  loading?: boolean;
}) => {
  const { data = [], header, onReload, loading } = props;
  return (
    <List
      header={<TableTitle onReload={onReload}>{header}</TableTitle>}
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
