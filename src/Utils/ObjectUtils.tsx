import { TagProps } from "antd";
import { PresetColorType, PresetStatusColorType } from "antd/es/_util/colors";
import { LiteralUnion } from "antd/es/_util/type";
import {
  Graph,
  Route,
  WorkRequest,
  XMLGraphState,
} from "../Config/WorkflowConfig";
import {
  deserializeDocument,
  deserializeDocumentChangeLogs,
} from "./Serializer";
import { getAbbreviation } from "./StringUtils";
import { Clause } from "Config/FilterConfig";
import dayjs from "dayjs";

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

export interface WorkRequestValue {
  runningOrder: number;
  workRequest: WorkRequest;
  tags: CollapseTag[];
}

export type Color = LiteralUnion<PresetColorType | PresetStatusColorType>;

export type CollapseTag = {
  tooltip?: string;
  width?: number | string;
} & TagProps;

export const extractWorkRequests = (
  routes: Route[] = []
): { [source: string]: WorkRequestValue } => {
  return routes.reduce(
    (
      res: {
        [source: string]: WorkRequestValue;
      },
      route
    ) => {
      res[route.source] = {
        runningOrder: route.runningOrder,
        workRequest: route.metadata.workRequest,
        tags: [
          {
            tooltip: route.service,
            children: getAbbreviation(route.service),
            color: "processing",
          },
          {
            tooltip: "Operation",
            children: route.operation,
            color: "processing",
          },
        ],
      };
      return res;
    },
    {}
  );
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

export const formatCamelCaseKey = (key: string): string => {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
};

export const extractStatesAfterSource = (
  source: string,
  graph: Graph
): XMLGraphState[] => {
  const result = graph.parsedGraphResult?.result || {};
  const sortedResult = Object.values(result).sort(
    (a: any, b: any) => a.runningOrder - b.runningOrder
  );
  const itemsAfterSource: XMLGraphState[] = [];
  let foundSource = false;

  for (const item of sortedResult) {
    if (foundSource) {
      itemsAfterSource.push(item as XMLGraphState);
    } else if ((item as any).source === source) {
      foundSource = true;
    }
  }

  return itemsAfterSource;
};

export const getLastRouteSource = (routes: Route[]) => {
  const copiedRoutes = routes.map((route) => ({ ...route }));
  const sortedRoutes = copiedRoutes.sort(
    (a, b) => b.runningOrder - a.runningOrder
  );
  return sortedRoutes[0]?.source;
};

export const generateBlob = (
  data: any[],
  excludedColumn: { [key: string]: boolean }
): Blob => {
  const header =
    Object.keys(data[0])
      .filter((k) => !excludedColumn[k])
      .join(",") + "\n";
  const rows = data
    .map((item) =>
      Object.entries(item)
        .filter(([k, _]) => !excludedColumn[k])
        .map(([_, v]) => JSON.stringify(v))
        .join(",")
    )
    .join("\n");
  const csvData = header + rows;

  return new Blob([csvData], { type: "text/csv;charset=utf-8" });
};

export const noFilters = (clauses: Clause[] = []) => {
  if (clauses.length === 0) {
    return true;
  }
  return clauses.every((clause) => {
    if (!clause) return true;
    if (clause.condition && clause.condition.toLowerCase().includes("null")) {
      return false;
    }
    return (
      !clause.input &&
      (!clause.checkbox ||
        Object.values(clause.checkbox).every((checked) => !checked)) &&
      !clause.date
    );
  });
};

export const transformClausesDate = (data: Clause[]): Clause[] => {
  return data.map((item) => {
    if (item.date) {
      return {
        ...item,
        date: {
          start: dayjs(item.date.start),
          end: item.date.end ? dayjs(item.date.end) : undefined,
        },
      };
    } else {
      return item;
    }
  });
};
