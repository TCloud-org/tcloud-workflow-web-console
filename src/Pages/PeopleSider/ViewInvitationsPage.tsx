import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import {
  InvitationToken,
  getInvitationTokensBySenderAndLocation,
} from "Network/SecurityFetch";
import { Account } from "features/auth/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const ViewInvitationsPage = () => {
  const { clientId } = useParams();
  const account: Account = useSelector((state: any) => state.auth.account);

  const [invitationTokens, setInvitationTokens] = useState<InvitationToken[]>(
    []
  );

  const fetchInvitations = useCallback(async () => {
    if (account && clientId) {
      const res = await getInvitationTokensBySenderAndLocation(
        account.email,
        clientId
      );
      setInvitationTokens(res.invitationTokens);
    }
  }, [clientId, account]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return (
    <AppSpace>
      <PageTitle>Coming soon...</PageTitle>
      <div>{JSON.stringify(invitationTokens)}</div>
    </AppSpace>
  );
};
