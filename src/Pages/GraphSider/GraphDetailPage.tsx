import { EditOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Graph } from "../../Config/WorkflowConfig";
import { CodeDisplay } from "../../DataDisplayComponents/CodeDisplay";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppIconButton } from "../../DataEntryComponents/AppIconButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getGraphById } from "../../Network/WorkflowFetch";
import { GraphInfoCard } from "../../WorkflowComponents/GraphInfoCard";

export const GraphDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { graphId } = useParams();

  const [graph, setGraph] = useState<Graph>();
  const [nextAvailableVersion, setNextAvailableVersion] = useState<number>(1);

  const fetchGraph = useCallback(() => {
    if (graphId) {
      getGraphById(graphId)
        .then((response) => {
          setGraph(response.graph);
          setNextAvailableVersion(response.nextAvailableVersion);
        })
        .catch((err) => console.error(err));
    }
  }, [graphId]);

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  const handleEdit = () => {
    navigate(`${location.pathname}/edit`, {
      state: {
        graph,
        nextAvailableVersion,
      },
    });
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppIconButton onClick={handleEdit}>
            <EditOutlined />
          </AppIconButton>
        }
      >{`Graph #${graphId}`}</PageTitle>

      <GraphInfoCard graph={graph} />
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