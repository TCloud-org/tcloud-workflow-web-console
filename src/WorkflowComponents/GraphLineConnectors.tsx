import { AppLineConnector } from "LayoutComponents/AppLineConnector";
import { useEffect, useState } from "react";
import { useXarrow } from "react-xarrows";
import { v4 } from "uuid";
import { GraphState } from "./GraphBuilder";

const defaultLimit = 250;
export const GraphLineConnectors = (props: {
  states: GraphState[];
  state?: GraphState;
  reset?: boolean;
}) => {
  const { states, reset } = props;
  const [limit, setLimit] = useState<number>(defaultLimit);

  const updateXarrow = useXarrow();

  useEffect(() => {
    setLimit(defaultLimit);
  }, [reset]);

  useEffect(() => {
    if (limit > 0 || reset) {
      updateXarrow();
      setLimit((prev) => prev - 1);
    }
  }, [reset, limit, updateXarrow]);

  return (
    <div onLoad={useXarrow()}>
      {states.map((state, i) =>
        (state.results || [])
          .filter((result) => result)
          .map((result, j) => (
            <AppLineConnector
              key={`${v4()}-${i}-${j}`}
              start={`${state.id}-${result.type}-${result.name}`}
              end={
                states.find((item) => item.name === result.target)?.id as string
              }
              headShape="arrow1"
            />
          ))
      )}
    </div>
  );
};
