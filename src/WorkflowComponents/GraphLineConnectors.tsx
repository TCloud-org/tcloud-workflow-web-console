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
        (state.branches || [])
          .filter((branch) => branch)
          .map((branch, j) => (
            <AppLineConnector
              key={`${v4()}-${i}-${j}`}
              start={`${state.id}-${branch.type}-${branch.name}`}
              end={
                states.find((item) => item.name === branch.target)?.id as string
              }
              headShape="arrow1"
              startAnchor={{ position: "left", offset: { x: 0, y: 0 } }}
              endAnchor={{
                position: "left",
                offset: { x: 0, y: -16 + j * 16 },
              }}
            />
          ))
      )}
    </div>
  );
};
