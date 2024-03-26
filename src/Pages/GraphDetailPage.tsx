import { Typography } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WOS_GET_GRAPH_BY_ID_ENDPOINT } from "../Config/EndpointConfig";
import { Graph } from "../Config/WorkflowConfig";
import { CodeDisplay } from "../DataDisplayComponents/CodeDisplay";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const GraphDetailPage = () => {
  const { graphId } = useParams();

  const [graph, setGraph] = useState<Graph>();

  const fetchGraph = useCallback(() => {
    if (graphId) {
      axios
        .get(`${WOS_GET_GRAPH_BY_ID_ENDPOINT}?graphId=${graphId}`)
        .then((response) => {
          setGraph(response.data.graph);
        })
        .catch((err) => console.error(err));
    }
  }, [graphId]);

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  return (
    <AppSpace>
      <Typography.Title level={4}>{`Graph ${graphId}`}</Typography.Title>
      <CodeDisplay
        bordered
        hovered
        code={graph?.xmlContent}
        showLineNumbers
        language="xml"
        copyToClipboard
        style={{ margin: "16px" }}
      />
    </AppSpace>
  );
};
