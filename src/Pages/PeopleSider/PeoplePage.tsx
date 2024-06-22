import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { ClientPage } from "./ClientPage";

export const PeoplePage = () => {
  return (
    <AppMainTabs
      defaultActiveKey="client"
      items={[
        {
          key: "client",
          label: "Client",
          children: <ClientPage />,
        },
      ]}
    />
  );
};
