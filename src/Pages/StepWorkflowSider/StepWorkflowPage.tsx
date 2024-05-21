import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { BucketPage } from "Pages/BucketSider/BucketPage";
import { LiveWorkflowPage } from "Pages/LiveSider/LiveWorkflowPage";
import { QueryPage } from "Pages/QuerySider/QueryPage";
import { StepWorkflowConfigurationTab } from "./StepWorkflowConfigurationTab";

export const StepWorkflowPage = () => {
  return (
    <AppSurface type="form">
      <AppMainTabs
        defaultActiveKey="work"
        items={[
          {
            key: "work",
            label: "Work",
            children: <LiveWorkflowPage />,
          },
          {
            key: "bucket",
            label: "Bucket",
            children: <BucketPage />,
          },
          {
            key: "query",
            label: "Query",
            children: <QueryPage />,
          },
          {
            key: "configuration",
            label: "Configuration",
            children: <StepWorkflowConfigurationTab />,
          },
        ]}
      />
    </AppSurface>
  );
};
