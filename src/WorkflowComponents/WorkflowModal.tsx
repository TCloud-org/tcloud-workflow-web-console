import { Descriptions, Modal } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WOS_GET_GRAPH_BY_WORKFLOW_ID_AND_ALIAS_ENDPOINT } from "../Config/EndpointConfig";
import { Graph } from "../Config/WorkflowConfig";
import { CodeDisplay } from "../DataDisplayComponents/CodeDisplay";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { Box } from "../LayoutComponents/Box";

export const WorkflowModal = (props: {
  open?: boolean;
  alias?: string;
  onClose?: () => void;
}) => {
  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow
  );

  const { alias = "live", onClose } = props;

  const [graph, setGraph] = useState<Graph>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchGraph = useCallback(async () => {
    if (alias && workflowId) {
      setLoading(true);

      const params = new URLSearchParams();
      params.set("workflowId", workflowId);
      params.set("alias", alias);
      await axios
        .get(
          `${WOS_GET_GRAPH_BY_WORKFLOW_ID_AND_ALIAS_ENDPOINT}?${params.toString()}`
        )
        .then((response) => {
          setGraph(response.data?.graph || {});
        })
        .catch((err) => console.error(err));

      setLoading(false);
    }
  }, [workflowId, alias]);

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  return (
    <Modal
      title={workflowName}
      centered
      open={props.open}
      onCancel={onClose}
      okButtonProps={{
        style: { display: "none" },
      }}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      width="65%"
    >
      <AppSpace size="small" loading={loading}>
        <Descriptions layout="horizontal" size="small">
          <Descriptions.Item label="Workflow Id" span={24}>
            {workflowId}
          </Descriptions.Item>
          <Descriptions.Item label="Alias" span={24}>
            {alias}
          </Descriptions.Item>
        </Descriptions>

        <Box>
          <AppSpace>
            <CodeDisplay
              hovered
              showLineNumbers
              bordered
              style={{
                width: "100%",
              }}
              language="xml"
              code={graph?.xmlContent}
              copyToClipboard
            />
          </AppSpace>
        </Box>
      </AppSpace>
    </Modal>
  );
};
