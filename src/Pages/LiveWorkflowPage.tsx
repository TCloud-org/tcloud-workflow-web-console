import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WOS_GET_WORK_IDS_BY_WORKFLOW_ID_ENDPOINT } from "../Config/EndpointConfig";
import { AppList } from "../DataDisplayComponents/AppList";
import { PageTitle } from "../DataDisplayComponents/PageTitle";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const LiveWorkflowPage = () => {
  const location = useLocation();
  const { workflowId, workflowName } = useSelector(
    (state: any) => state.workflow.workflow
  );

  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWorkIds = useCallback(() => {
    if (!workflowId) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `${WOS_GET_WORK_IDS_BY_WORKFLOW_ID_ENDPOINT}?workflowId=${parseInt(
          workflowId
        )}`
      )
      .then((response) => {
        setWorks(
          response.data.workIds.map((workId: string) => ({
            title: workId,
            href: `${location.pathname}/${workId}`,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [workflowId, location.pathname]);

  useEffect(() => {
    fetchWorkIds();
  }, [fetchWorkIds]);

  return (
    <AppSpace>
      <PageTitle>{workflowName}</PageTitle>
      <AppList
        data={works}
        header="Workflows"
        onReload={fetchWorkIds}
        loading={loading}
      />
    </AppSpace>
  );
};
