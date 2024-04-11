import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailNotificationWorkflowPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateWorkflow = () => {
    navigate(`${location.pathname}/create`);
  };

  return (
    <AppSpace>
      <PageTitle>Email Notification Workflow</PageTitle>
      <AppButton onClick={handleCreateWorkflow}>
        Create a new workflow
      </AppButton>
    </AppSpace>
  );
};
