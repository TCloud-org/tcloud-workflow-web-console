import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { AuthTokenPage } from "Pages/AuthTokenSider/AuthTokenPage";

export const SecurityPage = () => {
  return (
    <AppMainTabs
      defaultActiveKey="authentication"
      items={[
        {
          key: "authentication",
          label: "Authentication",
          children: <AuthTokenPage />,
        },
      ]}
    />
  );
};
