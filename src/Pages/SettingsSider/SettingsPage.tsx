import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { SubscriptionPage } from "Pages/Subscription/SubscriptionPage";
import { AccountPage } from "./AccountPage";
import { BillingPage } from "./BillingPage";
import { GeneralPage } from "./GeneralPage";
import { useDispatch, useSelector } from "react-redux";
import { setTabIndex } from "features/settings/settingsSlice";

export const SettingsPage = () => {
  const tabIndex = useSelector((state: any) => state.settings.tabIndex);
  const dispatch = useDispatch();

  const handleTabChange = (activeKey: string) => {
    dispatch(setTabIndex(activeKey));
  };

  return (
    <AppSurface type="form">
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
    </AppSurface>
  );
};
