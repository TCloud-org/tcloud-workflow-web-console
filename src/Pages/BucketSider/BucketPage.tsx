import { Alert, Flex, Typography } from "antd";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { useCallback, useEffect, useState } from "react";
import { getBuckets } from "../../Network/WorkflowFetch";
import { useSelector } from "react-redux";
import { Route } from "../../Config/WorkflowConfig";
import { BucketTable } from "../../WorkflowComponents/BucketTable";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppEmpty } from "../../DataDisplayComponents/AppEmpty";

export const BucketPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [bucketMap, setBucketMap] = useState<Record<string, Route[]>>({});
  const [loading, setLoading] = useState(false);

  const fetchBuckets = useCallback(async () => {
    setLoading(true);
    const data = await getBuckets(clientId, workflowId);
    setBucketMap(data?.bucketMap || {});
    setLoading(false);
  }, [clientId, workflowId]);

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  return (
    <AppSpace loading={loading}>
      <PageTitle onReload={fetchBuckets}>Bucket</PageTitle>
      <Alert
        message={
          <Typography.Text>
            Bucket serialized ID is following this principle:{" "}
            <code>[graph_id]:[state_name]:[result_name]:[result_type]</code>
          </Typography.Text>
        }
        type="info"
        showIcon
      />
      {Object.keys(bucketMap).length === 0 && (
        <Flex justify="center">
          <AppEmpty />
        </Flex>
      )}
      {Object.entries(bucketMap).map(([bucketId, routes], i) => (
        <BucketTable bucketId={bucketId} routes={routes} key={i} />
      ))}
    </AppSpace>
  );
};
