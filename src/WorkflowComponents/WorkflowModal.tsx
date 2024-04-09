import { DescriptionsProps, Modal } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WOS_GET_GRAPH_BY_WORKFLOW_ID_AND_ALIAS_ENDPOINT } from "../Config/WOSEndpointConfig";
import { Graph } from "../Config/WorkflowConfig";
import { AppDescriptions } from "../DataDisplayComponents/AppDescriptions";
import { CodeDisplay } from "../DataDisplayComponents/CodeDisplay";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { Box } from "../LayoutComponents/Box";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { Span } from "../Config/DataDisplayInterface";

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

  const descriptions: DescriptionsProps["items"] = [
    {
      label: "Workflow Id",
      span: Span[2],
      children: workflowId,
      key: "workflowId",
    },
    {
      label: "Alias",
      span: Span[2],
      children: alias,
      key: "alias",
    },
  ];

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
      <AppSpace loading={loading}>
        <AppSurface style={{ paddingBottom: 0 }}>
          <AppDescriptions items={descriptions} layout="vertical" />
        </AppSurface>

        <Box>
          <AppSpace>
            <CodeDisplay
              hovered
              showLineNumbers
              bordered
              copyToClipboard
              style={{
                width: "100%",
              }}
              language="xml"
              code={graph?.xmlContent}
            />
          </AppSpace>
        </Box>
      </AppSpace>
    </Modal>
  );
};
