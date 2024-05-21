import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { SubscriptionPage } from "Pages/Subscription/SubscriptionPage";
import { AccountPage } from "./AccountPage";
import { BillingPage } from "./BillingPage";
import { GeneralPage } from "./GeneralPage";

export const SettingsPage = () => {
  return (
    <AppSurface type="form">
      <AppMainTabs
        defaultActiveKey="account"
        items={[
          {
            key: "account",
            label: "Account",
            children: <AccountPage />,
          },
          {
            key: "general",
            label: "General",
            children: <GeneralPage />,
          },
          {
            key: "billing",
            label: "Billing",
            children: <BillingPage />,
          },
          {
            key: "subscription",
            label: "Subscription",
            children: <SubscriptionPage />,
          },
        ]}
      />
    </AppSurface>
  );
};
