import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { SubscriptionPage } from "Pages/Subscription/SubscriptionPage";
import { setTabIndex } from "features/settings/settingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AccountPage } from "./AccountPage";
import { BillingPage } from "./BillingPage";
import { GeneralPage } from "./GeneralPage";

export const SettingsPage = () => {
  const tabIndex = useSelector((state: any) => state.settings.tabIndex);
  const dispatch = useDispatch();

  const handleTabChange = (activeKey: string) => {
    dispatch(setTabIndex(activeKey));
  };

  return (
    <AppMainTabs
      activeKey={tabIndex}
      onChange={handleTabChange}
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
          label: "Plan",
          children: <SubscriptionPage />,
        },
      ]}
    />
  );
};
