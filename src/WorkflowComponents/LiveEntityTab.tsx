import { useEffect, useState } from "react";
import { Route } from "../Config/WorkflowConfig";
import { AppCollapse } from "../DataDisplayComponents/AppCollapse";
import { AppEmpty } from "../DataDisplayComponents/AppEmpty";
import { CodeDisplay } from "../DataDisplayComponents/CodeDisplay";
import { extractEntities } from "../Utils/ObjectUtils";

export const LiveEntityTab = (props: { routes: Route[] }) => {
  const { routes = [] } = props;

  const [entities, setEntities] = useState<object>({});

  useEffect(() => {
    setEntities(extractEntities(routes));
  }, [routes]);

  if (Object.entries(entities).length === 0) {
    return <AppEmpty />;
  }

  return (
    <AppCollapse
      items={Object.entries(entities).map(([k, v], i) => ({
        key: i,
        label: k,
        children: <CodeDisplay code={JSON.stringify({ [k]: v }, null, 2)} />,
      }))}
    />
  );
};
