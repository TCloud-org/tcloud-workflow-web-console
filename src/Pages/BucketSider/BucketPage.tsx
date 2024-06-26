import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import { PremiumMask } from "DataEntryComponents/PremiumMask";
import { Alert, Flex, Select, Typography } from "antd";
import axios from "axios";
import { setBucketWorkflowId } from "features/settings/stepWorkflowSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Workflow } from "../../Config/WorkflowConfig";
import { AppEmpty } from "../../DataDisplayComponents/AppEmpty";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getBuckets } from "../../Network/WorkflowFetch";
import { BucketTable } from "../../WorkflowComponents/BucketTable";

export const BucketPage = () => {
  const dispatch = useDispatch();
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);
  const bucketWorkflowId = useSelector(
    (state: any) => state.stepWorkflow.bucketWorkflowId
  );

  const [bucketMap, setBucketMap] = useState<Record<string, Route[]>>({});
  const [loading, setLoading] = useState(false);
  const [isRestricted, setIsRestricted] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const fetchWorkflows = useCallback(async () => {
    if (clientId && authToken) {
      const res = await axios
        .get(
          `${WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => res.data.workflows || [])
        .catch((err) => console.error(err));
      setWorkflows(res);
    }
  }, [clientId, authToken]);

  const fetchBuckets = useCallback(async () => {
    if (bucketWorkflowId) {
      setLoading(true);
      const data = await getBuckets(
        decodeURIComponent(bucketWorkflowId),
        authToken
      );
      if (data.response && data.response.status === 403) {
        setIsRestricted(true);
      } else {
        setBucketMap(data?.bucketMap || {});
      }
      setLoading(false);
    }
  }, [bucketWorkflowId, authToken]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  useEffect(() => {
    fetchBuckets();
  }, [fetchBuckets]);

  return (
    <AppSpace loading={loading}>
      <PageTitle
        onReload={fetchBuckets}
        endDecorator={
          <Select
            options={workflows.map((workflow) => ({
              label: workflow.workflowName,
              value: workflow.workflowId,
            }))}
            placeholder="Select a workflow"
            value={workflows.length > 0 ? bucketWorkflowId : undefined}
            onChange={(value: string) => dispatch(setBucketWorkflowId(value))}
            dropdownStyle={{ width: "auto" }}
          />
        }
      >
        Bucket
      </PageTitle>

      <Flex vertical gap={16} className="relative">
        {isRestricted && <PremiumMask />}
        <Alert
          message={
            <Typography.Text>
              Bucket serialized ID is following this principle:{" "}
              <code>[graph_id]:[state_name]:[result_name]:[result_type]</code>
            </Typography.Text>
          }
          type="info"
          className="glass-info"
          showIcon
        />
        {Object.keys(bucketMap).length === 0 && <AppEmpty />}
        {Object.entries(bucketMap).map(([bucketId, routes], i) => (
          <BucketTable bucketId={bucketId} routes={routes} key={i} />
        ))}
      </Flex>
    </AppSpace>
  );
};
