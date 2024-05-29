import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ListItem } from "../../Config/DataDisplayInterface";
import { AppList } from "../../DataDisplayComponents/AppList";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getRetryPolicies } from "../../Network/RetryFetch";

export const RetryPolicyPage = () => {
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const [retryPolicies, setRetryPolicies] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRetryPolicies = useCallback(async () => {
    setLoading(true);
    const data = await getRetryPolicies(clientId, authToken);
    const policies = data?.retryPolicies || [];
    setRetryPolicies(
      policies.map((policy) => ({
        title: policy.name,
        href: `/retry-policy/${encodeURIComponent(policy.retryPolicyId)}`,
      }))
    );
    setLoading(false);
  }, [clientId, authToken]);

  useEffect(() => {
    fetchRetryPolicies();
  }, [fetchRetryPolicies]);

  return (
    <AppSpace loading={loading}>
      <PageTitle>Retry Policy</PageTitle>
      <AppList
        data={retryPolicies}
        header="Policies"
        onReload={fetchRetryPolicies}
        headerEndDecorator={
          <AppButton
            onClick={() => navigate("/step-workflow/add-retry-policy")}
          >
            Add a new retry policy
          </AppButton>
        }
      />
    </AppSpace>
  );
};
