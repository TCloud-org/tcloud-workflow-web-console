import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  AutomationStep,
  EmailNotificationTemplates,
  TemplateComponent,
  TemplateComponentProps,
} from "Config/AutomationConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppDroppable } from "DataEntryComponents/AppDroppable";
import { Flex } from "antd";
import { Dispatch, Key, SetStateAction, useState } from "react";
import { EmailNotificationStep } from "./EmailNotificationStep";
import { RemovableDroppable } from "./RemovableDroppable";
import { v4 } from "uuid";
import { EventWorkflow } from "Config/EventWorkflowConfig";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const removableId = "removable";

export const EventWorkflowSortableForm = (props: {
  value?: any;
  onChange?: Dispatch<SetStateAction<any>>;
  steps?: AutomationStep[];
  setSteps?: Dispatch<SetStateAction<AutomationStep[]>>;
  showAdd?: boolean;
  disabled?: boolean;
  eventWorkflow?: EventWorkflow;
}) => {
  const {
    value,
    onChange = () => {},
    steps = EmailNotificationTemplates["blank"],
    setSteps = () => {},
    showAdd = true,
    eventWorkflow,
  } = props;

  const [showRemovable, setShowRemovable] = useState<boolean>(false);
  const [isDragMove, setIsDragMove] = useState<boolean>(false);
  const filteredSteps = steps.filter((step) => !step.hidden);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAdd = (index: number, key: Key | undefined) => {
    if (!key) return;

    const clonedSteps = [...steps];
    clonedSteps.splice(index + 1, 0, {
      ...TemplateComponent[key as keyof TemplateComponentProps],
      id: v4(),
    });
    setSteps(clonedSteps);
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    if (steps.find((item) => item.id === active.id)?.removable) {
      setShowRemovable(true);
    }
  };

  const handleDragMove = ({ over, active }: DragMoveEvent) => {
    setIsDragMove(true);
    const clonedSteps = [...steps];
    const index = clonedSteps.findIndex((item) => item.id === active.id);
    if (index < 0) return;

    if (over?.id === removableId) {
      clonedSteps[index] = { ...clonedSteps[index], hidden: true };
      setSteps(clonedSteps);
    } else {
      if (clonedSteps[index].hidden) {
        clonedSteps[index] = { ...clonedSteps[index], hidden: false };
        setSteps(clonedSteps);
      }
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setIsDragMove(false);
    setShowRemovable(false);
    if (!over || active.id === over.id) return;

    if (over.id === removableId) {
      setSteps((prev) => {
        const removedIndex = prev.findIndex(
          (item) => item.removable && item.id === active.id
        );
        if (removedIndex < 0) return prev;
        prev.splice(removedIndex, 1);
        return prev;
      });
      return;
    }

    setSteps((prev) => {
      const oldIndex = prev.findIndex(
        (item) => !item.fixed && item.id === active.id
      );
      const newIndex = prev.findIndex(
        (item) => !item.fixed && item.id === over.id
      );

      if (oldIndex < 0 || newIndex < 0) return prev;

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
      measuring={measuringConfig}
    >
      <AppDroppable id="droppable">
        <AppSurface
          type="dot"
          style={{ height: "70vh", padding: "64px 0" }}
          className="flex items-center justify-center"
        >
          <SortableContext
            items={filteredSteps}
            strategy={verticalListSortingStrategy}
          >
            <Flex gap="8px" vertical align="center" justify="center">
              {filteredSteps.map((step, i) => (
                <EmailNotificationStep
                  data={step}
                  onAdd={(key) => handleAdd(i, key)}
                  key={i}
                  isDragStart={isDragMove}
                  last={i === filteredSteps.length - 1}
                  collect={onChange}
                  formData={value}
                  showAdd={showAdd}
                  index={i}
                  status={step.status}
                  disabled={props.disabled}
                  eventWorkflow={eventWorkflow}
                />
              ))}
            </Flex>
          </SortableContext>
        </AppSurface>
      </AppDroppable>
      {showRemovable && (
        <RemovableDroppable
          id={removableId}
          style={{
            position: "absolute",
            bottom: 96,
            right: 16,
          }}
        />
      )}
    </DndContext>
  );
};
