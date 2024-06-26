import { Email } from "Config/EMSConfig";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppSpace } from "LayoutComponents/AppSpace";
import { List } from "antd";
import { ListItemMetaProps } from "antd/es/list";
import { EmailListItem } from "./EmailListItem";
import { EmailListItemContent } from "./EmailListItemContent";
import { EmailListItemDescription } from "./EmailListItemDescription";
import { paginationConfig } from "Config/LayoutConfig";

const emailComparator = (a: Email, b: Email) => {
  const dateA = new Date(a.sentAt);
  const dateB = new Date(b.sentAt);

  return dateB.getTime() - dateA.getTime();
};

export const EmailList = (props: { emails?: Email[] }) => {
  const { emails = [] } = props;
  return (
    <AppSpace>
      <AppSearchInput />
      <List
        itemLayout="vertical"
        dataSource={
          emails.sort(emailComparator).map((email) => ({
            title: `Subject: ${email.subject}`,
            description: <EmailListItemDescription email={email} />,
            children: <EmailListItemContent email={email} />,
            email: email,
          })) as (ListItemMetaProps & { email: Email })[]
        }
        renderItem={(item) => <EmailListItem item={item} />}
        pagination={paginationConfig}
      />
    </AppSpace>
  );
};
