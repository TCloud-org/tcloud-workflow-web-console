import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { useParams } from "react-router-dom";

export const InvitationPage = () => {
  const { token } = useParams();
  return (
    <AppSpace>
      <PageTitle>Coming soon...</PageTitle>
    </AppSpace>
  );
};
