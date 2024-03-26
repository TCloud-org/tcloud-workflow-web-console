import { Select, Space, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  BRAND,
  WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT,
} from "../Config/EndpointConfig";
import { useDispatch, useSelector } from "react-redux";
import { setClientId } from "../features/workflow/clientSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { setWorkflow } from "../features/workflow/workflowSlice";
import { deserializeWorkflow, serializeWorkflow } from "../Utils/Serializer";
const { Link } = Typography;

export const AppHeader = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const workflow = useSelector((state: any) => state.workflow.workflow);
  const dispatch = useDispatch();

  const [workflows, setWorkflows] = useState([]);

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
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link style={{ marginRight: "16px" }} strong href="/" target="_blank">
        {BRAND}
      </Link>

      <Space>
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
          style={{ width: 150 }}
          placeholder="Select client ID"
          value={clientId}
          onChange={handleClientIdChange}
          options={[{ value: "admin", label: "admin" }]}
        />
      </Space>
    </Header>
  );
};
