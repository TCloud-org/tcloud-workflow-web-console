import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListItem } from "../Config/DataDisplayInterface";
import { AppList } from "../DataDisplayComponents/AppList";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { getRetryPolicies } from "../Network/RetryFetch";

export const RetryPolicyPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);

  const [retryPolicies, setRetryPolicies] = useState<ListItem[]>([]);

  const fetchRetryPolicies = useCallback(async () => {
    const data = await getRetryPolicies(clientId);
    const policies = data?.retryPolicies || [];
    setRetryPolicies(
      policies.map((policy) => ({
        title: policy.name,
        href: `/retry-policy/${policy.retryPolicyId}`,
      }))
    );
  }, [clientId]);

  useEffect(() => {
    fetchRetryPolicies();
  }, [fetchRetryPolicies]);

  return (
    <AppSpace>
      <AppList data={retryPolicies} header="Retry Policies" />
    </AppSpace>
  );
};
