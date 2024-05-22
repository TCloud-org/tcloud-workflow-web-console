import { AppLineConnector } from "LayoutComponents/AppLineConnector";
import { useEffect } from "react";
import { useXarrow } from "react-xarrows";
import { v4 } from "uuid";
import { GraphState } from "./GraphBuilder";

export const GraphLineConnectors = (props: {
  states: GraphState[];
  state?: GraphState;
}) => {
  const { states } = props;

  const updateXarrow = useXarrow();

  useEffect(() => {
    updateXarrow();
  }, [states, updateXarrow]);

  return (
    <div onLoad={useXarrow()}>
      {states.map((state, i) =>
        (state.results || []).map((result, j) => (
          <AppLineConnector
            key={`${v4()}-${i}-${j}`}
            start={`${state.id}-${result.type}-${result.name}`}
            end={
              states.find((item) => item.name === result.target)?.id as string
            }
            // labels={{
            //   middle: <Typography.Text strong>{result.name}</Typography.Text>,
            // }}
          />
        ))
      )}
    </div>
  );
};
