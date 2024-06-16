import { EditOutlined } from "@ant-design/icons";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { CodeBeam } from "DataDisplayComponents/CodeBeam";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Graph } from "../../Config/WorkflowConfig";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppIconButton } from "../../DataEntryComponents/AppIconButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getGraphById } from "../../Network/WorkflowFetch";
import { GraphInfoCard } from "../../WorkflowComponents/GraphInfoCard";

export const GraphDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { graphId } = useParams();

  const authToken = useSelector((state: any) => state.auth.token);

  const [graph, setGraph] = useState<Graph>();
  const [nextAvailableVersion, setNextAvailableVersion] = useState<number>(1);

  const fetchGraph = useCallback(() => {
    if (graphId) {
      getGraphById(graphId, authToken)
        .then((response) => {
          setGraph(response.graph);
          setNextAvailableVersion(response.nextAvailableVersion);
        })
        .catch((err) => console.error(err));
    }
  }, [graphId, authToken]);

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
    <AppSurface>
      <AppSpace>
        <PageTitle
          endDecorator={
            <AppIconButton onClick={handleEdit} type="primary">
              <EditOutlined />
            </AppIconButton>
          }
        >
          {graphId}
        </PageTitle>

        <GraphInfoCard graph={graph} />
        <CodeBeam
          value="xml"
          snippets={[
            {
              key: "xml",
              label: "XML",
              value: graph?.graphArch?.xmlGraphFormat.xml || "",
              language: "xml",
            },
          ]}
        />
      </AppSpace>
    </AppSurface>
  );
};
