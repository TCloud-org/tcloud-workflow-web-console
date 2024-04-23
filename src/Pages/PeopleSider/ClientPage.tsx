import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Account } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const ClientPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const account: Account = useSelector((state: any) => state.auth.account);

  const handleAddClient = () => {
    navigate(`${location.pathname}/add`);
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppButton onClick={handleAddClient}>Add a client</AppButton>
        }
      >
        Client
      </PageTitle>
    </AppSpace>
  );
};
