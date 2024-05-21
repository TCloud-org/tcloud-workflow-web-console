import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { SupportPage } from "./SupportPage";
import { ContactPage } from "./ContactPage";

export const HelpPage = () => {
  return (
    <AppSurface type="form">
      <AppMainTabs
        defaultActiveKey="support"
        items={[
          {
            key: "support",
            label: "Support",
            children: <SupportPage />,
          },
          {
            key: "contact",
            label: "Contact",
            children: <ContactPage />,
          },
        ]}
      />
    </AppSurface>
  );
};
