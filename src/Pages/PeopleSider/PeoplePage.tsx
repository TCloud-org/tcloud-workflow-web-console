import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { ClientPage } from "./ClientPage";

export const PeoplePage = () => {
  return (
    <AppSurface type="form">
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
    </AppSurface>
  );
};
