import { SiderName } from "LayoutComponents/AppSider";
import { Route } from "../Config/WorkflowConfig";
import { BreadcrumbItem } from "../features/navigation/breadcrumbSlice";
import { formatDate } from "./DateUtils";
import { capitalizeEachWord } from "./StringUtils";

export const serializeWorkflow = (workflow: any) => {
  if (!workflow) {
    return null;
  }
  return [workflow.workflowId, workflow.workflowName].join("-");
};

export const deserializeWorkflow = (value: string) => {
  if (!value) {
    return null;
  }
  const data = value.split("-");
  return {
    workflowId: data[0],
    workflowName: data[1],
  };
};

const containsSpecialCharacters = (str: string): boolean => {
  return /[^\w\s]/.test(str);
};

export const deserializeLocation = (location: string): BreadcrumbItem[] => {
  const blocks = location.split("/").filter((item: string) => item);
  return blocks.map((item: string, i) => ({
    title:
      `/${item}` in SiderName
        ? SiderName[`/${item}` as keyof typeof SiderName]
        : containsSpecialCharacters(item)
        ? decodeURIComponent(item)
        : capitalizeEachWord(item),
    href: "/" + blocks.slice(0, i + 1).join("/"),
  }));
};

export const serializeRoute = (route: any) => {
  return [route.graphId, route.source, route.resultName, route.resultType].join(
    ":"
  );
};

export const parseError = (error: string | undefined) => {
  if (error === undefined || !error) {
    return undefined;
  }
  const parsedError = JSON.parse(error);
  try {
    parsedError.message = JSON.parse(
      `{${parsedError.message
        .replace(/(\d+)\s*:/g, '"$1":')
        .replace(/\\"{/g, "{")
        .replace(/}"/g, "}")}}`.replaceAll('"{', "{")
    );
  } catch (e) {
    console.error(e);
  }
  parsedError.stackTrace = Object.values(JSON.parse(parsedError.stackTrace));
  parsedError.localizedMessage = null;
  return JSON.stringify(parsedError, null, 2);
};

export const deserializeDocument = (route: Route) => {
  const copiedJson = JSON.parse(JSON.stringify(route));

  const entities = copiedJson.metadata?.document?.documentBody?.entities;
  for (const key in entities) {
    const byteArray = Uint8Array.from(atob(entities[key]), (c) =>
      c.charCodeAt(0)
    );
    const decodedString = new TextDecoder("utf-8").decode(byteArray);
    try {
      entities[key] = JSON.parse(decodedString);
    } catch (error) {
      entities[key] = decodedString;
    }
  }
  if (entities === undefined) return null;
  return entities;
};

export const deserializeDocumentChangeLogs = (route: Route) => {
  const copiedJson = JSON.parse(JSON.stringify(route));

  const changeLogs = copiedJson.metadata?.documentEntityChangeLog;
  for (const k in changeLogs) {
    for (const key in changeLogs[k]) {
      const byteArray = Uint8Array.from(atob(changeLogs[k][key]), (c) =>
        c.charCodeAt(0)
      );
      const decodedString = new TextDecoder("utf-8").decode(byteArray);
      changeLogs[k][key] = JSON.parse(decodedString);
      try {
        if (typeof changeLogs[k][key] === "string") {
          changeLogs[k][key] = JSON.parse(changeLogs[k][key]);
        }
      } catch (e) {}
    }
    if (k === "createdAt") {
      changeLogs[k] = formatDate(changeLogs[k]);
    }
  }

  return changeLogs;
};
