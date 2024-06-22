import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { ContactPage } from "./ContactPage";
import { SupportPage } from "./SupportPage";

export const HelpPage = () => {
  return (
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
  );
};
