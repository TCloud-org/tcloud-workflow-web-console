import { Graph, Route, XMLGraphState } from "../Config/WorkflowConfig";
import {
  deserializeDocument,
  deserializeDocumentChangeLogs,
} from "./Serializer";

export const populateFlowNodeData = (nodes: any[] = []) => {
  const newNodes = nodes.map((node) => ({ ...node }));
  let oddCount = 0;
  const mid = 400;
  const xDistance = 250;
  const yDistance = 150;
  for (let i = 0; i < newNodes.length; i++) {
    const x =
      i % 2 === 0
        ? mid
        : oddCount % 2 === 0
        ? mid + xDistance
        : mid - xDistance;
    const y = i * yDistance;
    newNodes[i].position = { x, y };
    if (i % 2 !== 0) {
      oddCount += 1;
    }
  }
  return newNodes;
};

export const populateFlowEdgeData = (edges: any[] = []) => {
  const newEdges = edges.map((edge) => ({ ...edge }));
  for (let i = 0; i < edges.length; i++) {
    newEdges[i].type = "smoothstep";
  }
  return newEdges;
};

export const extractEntities = (routes: Route[] = []) => {
  return routes
    .map((route) => deserializeDocument(route))
    .reduce((result, item) => {
      for (const [key, value] of Object.entries(item)) {
        result[key] = value;
      }
      return result;
    }, {});
};

export const extractLogs = (routes: Route[] = []) => {
  return routes.map((route) => deserializeDocumentChangeLogs(route));
};

export const extractNumOfChanges = (route: Route) => {
  const changeLogs = deserializeDocumentChangeLogs(route);

  if (changeLogs === undefined || changeLogs === null) {
    return null;
  }

  let total = 0;
  for (const [k, v] of Object.entries(changeLogs)) {
    if (k === "createdAt") continue;
    total += Object.keys(v || {}).length;
  }
  if (total === 0) {
    return null;
  }
  return `${total} change${total > 1 ? "s" : ""}`;
};

export const extractServices = (graph: Graph | undefined) => {
  const parsedGraphResult = graph?.parsedGraphResult;
  const services = Object.values(parsedGraphResult?.result || {}).map(
    (v) => (v as XMLGraphState).service
  );
  return Array.from(new Set(services));
};

export const extractStates = (graph: Graph | undefined) => {
  const parsedGraphResult = graph?.parsedGraphResult;
  return Object.entries(parsedGraphResult?.result || {})
    .sort(([, v1], [, v2]) => v1.runningOrder - v2.runningOrder)
    .map(([_, v]) => v);
};
