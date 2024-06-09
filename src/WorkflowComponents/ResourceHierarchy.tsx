import { FolderOpenRounded } from "@mui/icons-material";
import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import { Graph, Workflow } from "Config/WorkflowConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { getTokens } from "Network/AuthFetch";
import { getRetryPolicies } from "Network/RetryFetch";
import {
  fetchGraphsById,
  getServiceConfigurations,
} from "Network/WorkflowFetch";
import { Statistic, Tree, TreeDataNode } from "antd";
import { DirectoryTreeProps } from "antd/es/tree";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const treeData: TreeDataNode[] = [
  {
    title: "Workflow",
    key: "workflow",
    children: [],
  },
  {
    title: "Endpoint",
    key: "service-configuration",
    children: [],
  },
  {
    title: "Authentication",
    key: "authentication",
    children: [],
  },
  {
    title: "Retry Policy",
    key: "retry-policy",
    children: [],
  },
];

export const ResourceHierarchy = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const authToken = useSelector((state: any) => state.auth.token);

  const [treeNodes, setTreeNodes] = useState<TreeDataNode[]>(treeData);

  const fetchWorkflows = useCallback(async () => {
    if (clientId && authToken) {
      try {
        const res = await axios.get(
          `${WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        const workflows = (res.data.workflows as Workflow[]) || [];

        const graphs = Object.fromEntries(
          await Promise.all(
            workflows.map(async (workflow) => [
              workflow.workflowId,
              await fetchGraphsById(workflow.workflowId, authToken),
            ])
          )
        );

        setTreeNodes((prevTreeNodes) => {
          const clonedTreeNodes = [...prevTreeNodes];
          const index = clonedTreeNodes.findIndex(
            (node) => node.key === "workflow"
          );
          clonedTreeNodes[index].children = workflows.map(
            (workflow) =>
              ({
                key: workflow.workflowId,
                title: workflow.workflowName,
                children: (
                  (graphs[workflow.workflowId].graphs || []) as Graph[]
                ).map((graph) => ({
                  key: graph.graphId,
                  title: graph.graphId,
                  isLeaf: true,
                })),
              } as TreeDataNode)
          );
          return clonedTreeNodes;
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [clientId, authToken]);

  const fetchEndpoints = useCallback(async () => {
    if (clientId && authToken) {
      const res = await getServiceConfigurations(clientId, authToken);

      setTreeNodes((prev) => {
        const clonedTreeNodes = [...prev];
        const index = clonedTreeNodes.findIndex(
          (node) => node.key === "service-configuration"
        );
        clonedTreeNodes[index].children = Object.entries(
          res?.serviceConfigurationMap || {}
        ).map(
          ([service, configurations]) =>
            ({
              key: service,
              title: service,
              children: configurations.map((configuration) => ({
                key: configuration.serviceId,
                title: configuration.serviceId,
                isLeaf: true,
              })),
            } as TreeDataNode)
        );
        return clonedTreeNodes;
      });
    }
  }, [clientId, authToken]);

  const fetchRetryPolicy = useCallback(async () => {
    if (clientId && authToken) {
      const res = await getRetryPolicies(clientId, authToken);

      setTreeNodes((prev) => {
        const clonedTreeNodes = [...prev];
        const index = clonedTreeNodes.findIndex(
          (node) => node.key === "retry-policy"
        );
        clonedTreeNodes[index].children = res?.retryPolicies.map(
          (policy) =>
            ({
              key: policy.retryPolicyId,
              title: policy.name,
              isLeaf: true,
            } as TreeDataNode)
        );
        return clonedTreeNodes;
      });
    }
  }, [clientId, authToken]);

  const fetchTokens = useCallback(async () => {
    const res = await getTokens(clientId);
    setTreeNodes((prev) => {
      const clonedTreeNodes = [...prev];
      const index = clonedTreeNodes.findIndex(
        (node) => node.key === "authentication"
      );
      clonedTreeNodes[index].children = res?.tokens.map(
        (token) =>
          ({
            key: token.tokenId,
            title: token.name,
            isLeaf: true,
          } as TreeDataNode)
      );
      return clonedTreeNodes;
    });
  }, [clientId]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  useEffect(() => {
    fetchRetryPolicy();
  }, [fetchRetryPolicy]);

  useEffect(() => {
    fetchEndpoints();
  }, [fetchEndpoints]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const onSelect: DirectoryTreeProps["onSelect"] = (_, info) => {
    if (info.node.isLeaf) {
      const key = info.node.key.toString();
      const type = key.split("::")[0];
      window.open(`${type}/${encodeURIComponent(key)}`, "_blank");
    }
  };

  return (
    <AppCard>
      <Statistic
        title={<StatTitle>Resources</StatTitle>}
        valueStyle={{
          fontSize: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        valueRender={() => (
          <div className="gap-4 flex flex-col w-full">
            <p className="text-paragraph">
              Manage your resources all in one place
            </p>

            <div className="glass-inner-card px-5 py-4 gap-4 flex flex-col">
              <p className="flex items-center gap-2 !text-title">
                <FolderOpenRounded /> Choose a resource folder
              </p>

              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full border-[0.5px] border-solid border-divider-bolder bg-divider" />
                <div className="w-full bg-divider h-[1px]" />
                <div className="w-2 h-2 rounded-full border-[0.5px] border-solid border-divider-bolder bg-divider" />
              </div>

              <Tree.DirectoryTree
                style={{
                  backgroundColor: "transparent",
                }}
                multiple
                treeData={treeNodes}
                className="bg-transparent !text-disabled"
                onSelect={onSelect}
              />
            </div>
          </div>
        )}
      />
    </AppCard>
  );
};
