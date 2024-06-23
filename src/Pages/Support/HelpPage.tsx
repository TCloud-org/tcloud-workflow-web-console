import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { ContactPage } from "./ContactPage";
import { SupportPage } from "./SupportPage";
import { useDispatch, useSelector } from "react-redux";
import { setTabIndex } from "features/settings/helpSlice";

export const HelpPage = () => {
  const tabIndex = useSelector((state: any) => state.help.tabIndex);

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
