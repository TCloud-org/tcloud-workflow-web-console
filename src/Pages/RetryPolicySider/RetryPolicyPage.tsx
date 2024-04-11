import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListItem } from "../../Config/DataDisplayInterface";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getRetryPolicies } from "../../Network/RetryFetch";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { useNavigate } from "react-router-dom";

export const RetryPolicyPage = () => {
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);

  const [retryPolicies, setRetryPolicies] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRetryPolicies = useCallback(async () => {
    setLoading(true);
    const data = await getRetryPolicies(clientId);
    const policies = data?.retryPolicies || [];
    setRetryPolicies(
      policies.map((policy) => ({
        title: policy.name,
        href: `/retry-policy/${policy.retryPolicyId}`,
      }))
    );
    setLoading(false);
  }, [clientId]);

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
          <AppButton onClick={() => navigate("/retry-policy/add")}>
            Add a new retry policy
          </AppButton>
        }
      />
    </AppSpace>
  );
};