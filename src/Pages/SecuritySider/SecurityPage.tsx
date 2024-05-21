import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { AuthTokenPage } from "Pages/AuthTokenSider/AuthTokenPage";

export const SecurityPage = () => {
  return (
    <AppSurface type="form">
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
    </AppSurface>
  );
};
