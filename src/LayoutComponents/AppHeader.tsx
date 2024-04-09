import { AppSearchBar } from "DataEntryComponents/AppSearchBar";
import { Flex, Select, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "../Config/WOSEndpointConfig";
import { deserializeWorkflow, serializeWorkflow } from "../Utils/Serializer";
import { setClientId } from "../features/workflow/clientSlice";
import { setWorkflow } from "../features/workflow/workflowSlice";

export const AppHeader = () => {
  const { token } = theme.useToken();

  const navigate = useNavigate();

  const clientId = useSelector((state: any) => state.client.clientId);
  const workflow = useSelector((state: any) => state.workflow.workflow);
  const dispatch = useDispatch();

  const [workflows, setWorkflows] = useState([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (clientId) {
      fetchWorkflows(clientId);
    }
  }, [clientId]);

  const fetchWorkflows = (clientId: string) => {
    axios
      .get(`${WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`)
      .then((response) => {
        setWorkflows(response.data.workflows);
      })
      .catch((error) => console.error(error));
  };

  const handleClientIdChange = (value: string) => {
    dispatch(setClientId(value));
  };

  const handleWorkflowChange = (value: any) => {
    dispatch(setWorkflow(deserializeWorkflow(value)));
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        gap: "56px",
      }}
    >
      <Flex
        style={{
          backgroundColor: "rgba(250,250,250,255)",
          borderRadius: token.borderRadiusLG,
          flex: 1,
        }}
      >
        <AppSearchBar
          placeholder="Search by work ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onPressEnter={() =>
            navigate(`live/${decodeURIComponent(searchInput.trim())}`)
          }
        />
      </Flex>

      <Flex gap="8px" align="center" style={{ flex: 1 }} justify="flex-end">
        <Select
          style={{ width: 180 }}
          placeholder="Select workflow"
          value={serializeWorkflow(workflow)}
          onChange={handleWorkflowChange}
          options={workflows.map((item: any) => ({
            label: item.workflowName,
            value: `${item.workflowId}-${item.workflowName}`,
          }))}
        />
        <Select
          style={{ width: 120 }}
          placeholder="Select client ID"
          value={clientId}
          onChange={handleClientIdChange}
          options={[{ value: "admin", label: "admin" }]}
        />
      </Flex>
    </Header>
  );
};
