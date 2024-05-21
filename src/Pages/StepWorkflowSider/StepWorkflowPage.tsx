import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppMainTabs } from "LayoutComponents/AppMainTabs";
import { BucketPage } from "Pages/BucketSider/BucketPage";
import { LiveWorkflowPage } from "Pages/LiveSider/LiveWorkflowPage";
import { QueryPage } from "Pages/QuerySider/QueryPage";
import { StepWorkflowConfigurationTab } from "./StepWorkflowConfigurationTab";
import { useDispatch, useSelector } from "react-redux";
import { setTabIndex } from "features/settings/stepWorkflowSlice";

export const StepWorkflowPage = () => {
  const tabIndex = useSelector((state: any) => state.stepWorkflow.tabIndex);
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
