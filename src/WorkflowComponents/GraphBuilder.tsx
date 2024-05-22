import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { AddCircleRounded } from "@mui/icons-material";
import { ResultType } from "Config/WorkflowConfig";
import { Flex, Typography, theme } from "antd";
import { Fragment, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useXarrow } from "react-xarrows";
import { v4 } from "uuid";
import { GraphLineConnectors } from "./GraphLineConnectors";
import { GraphStateCard } from "./GraphStateCard";

export interface GraphResult {
  type?: ResultType;
  name?: string;
  target?: string;
}

export interface GraphState {
  id: string;
  name?: string;
  service?: string;
  operation?: string;
  results?: GraphResult[];
  removable?: boolean;
}

export const GraphBuilder = () => {
  const { token } = theme.useToken();

  const updateXarrow = useXarrow();

  const [states, setStates] = useState<GraphState[]>([
    {
      id: v4(),
      name: "Start",
      results: [{ type: "success", name: "SystemInitialized", target: "End" }],
    },
    { id: v4(), name: "End", results: [] },
  ]);

  const [activeState, setActiveState] = useState<GraphState | undefined>(
    undefined
  );

  const stateIds = useMemo(
    () => states.map((state) => ({ id: state.id })),
    [states]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "State") {
      setActiveState(event.active.data.current.state);
    }
    updateXarrow();
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveState(undefined);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isStateActive = active.data.current?.type === "State";
    if (!isStateActive) return;

    setStates((states) => {
      const activeStateIndex = states
        .filter((state) => state.name !== "Start" && state.name !== "End")
        .findIndex((state) => state.id === activeId);

      const overStateIndex = states
        .filter((state) => state.name !== "Start" && state.name !== "End")
        .findIndex((state) => state.id === overId);

      if (activeStateIndex < 0 || overStateIndex < 0) {
        return states;
      }

      return arrayMove(states, activeStateIndex, overStateIndex);
    });

    updateXarrow();
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
  };

  const handleAddState = () => {
    setStates((states) => {
      const newState = {
        id: v4(),
        name: "State",
        removable: true,
      };
      return [...states.slice(0, -1), newState, ...states.slice(-1)];
    });
  };

  const handleDeleteState = (id: string) => {
    const cloned = [...states];
    const index = cloned.findIndex((state) => state.id === id);
    if (index !== -1) {
      cloned.splice(index, 1);
      setStates(cloned);
    }
  };

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        p-10
        bg-slate-300/20
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <Flex vertical gap={48}>
            <Flex vertical gap={96}>
              <SortableContext items={stateIds}>
                {states.map((state, i) => (
                  <Fragment key={i}>
                    <GraphStateCard
                      key={i}
                      index={i}
                      state={state}
                      onDelete={handleDeleteState}
                      onUpdate={setStates}
                    />
                  </Fragment>
                ))}
              </SortableContext>
            </Flex>

            <GraphLineConnectors states={states} />

            <Flex
              gap={8}
              align="center"
              className="border-2 border-solid rounded-lg border-slate-400/20 p-4 bg-white cursor-pointer hover:border-primary"
              style={{ transition: "all 0.3s", boxShadow: token.boxShadow }}
              onClick={handleAddState}
            >
              <AddCircleRounded />

              <Typography.Text>Add state</Typography.Text>
            </Flex>
          </Flex>
        </div>

        {createPortal(
          <DragOverlay>
            {activeState && <GraphStateCard state={activeState} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
