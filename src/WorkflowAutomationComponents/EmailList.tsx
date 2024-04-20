import { Email } from "Config/EMSConfig";
import { Input, List } from "antd";
import { ListItemMetaProps } from "antd/es/list";
import { EmailListItem } from "./EmailListItem";
import { EmailListItemContent } from "./EmailListItemContent";
import { EmailListItemDescription } from "./EmailListItemDescription";
import { AppSpace } from "LayoutComponents/AppSpace";
import { SearchOutlined } from "@ant-design/icons";

const emailComparator = (a: Email, b: Email) => {
  const dateA = new Date(a.sentAt);
  const dateB = new Date(b.sentAt);

  return dateB.getTime() - dateA.getTime();
};

export const EmailList = (props: { emails?: Email[] }) => {
  const { emails = [] } = props;
  return (
    <AppSpace>
      <Input addonBefore={<SearchOutlined />} placeholder="Type to search" />
      <List
        itemLayout="vertical"
        dataSource={
          emails.sort(emailComparator).map((email) => ({
            title: email.subject,
            description: <EmailListItemDescription email={email} />,
            children: <EmailListItemContent email={email} />,
            email: email,
          })) as (ListItemMetaProps & { email: Email })[]
        }
        renderItem={(item) => <EmailListItem item={item} />}
        pagination={{
          showSizeChanger: true,
          defaultPageSize: 10,
          showQuickJumper: true,
          pageSizeOptions: [5, 10, 25, 50, 100],
        }}
      />
    </AppSpace>
  );
};
