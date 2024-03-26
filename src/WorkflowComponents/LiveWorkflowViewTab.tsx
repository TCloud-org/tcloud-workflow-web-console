import { SelectItem } from "../Config/DataDisplayInterface";
import { Route } from "../Config/WorkflowConfig";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { StateCard } from "./StateCard";

export const LiveWorkflowViewTab = (props: {
  routeMap: { [key: string]: Route[] };
  versions: SelectItem[];
  version: string;
}) => {
  const { routeMap, version } = props;

  const routes: Route[] = (routeMap && version && routeMap[version]) || [];

  return (
    <AppSpace>
      {routes.map((route: Route, i) => (
        <StateCard key={i} data={route} />
      ))}
    </AppSpace>
  );
};
