import {
  CalendarOutlined,
  ClockCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";
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
import { AutomationStep } from "Config/AutomationConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppDroppable } from "DataEntryComponents/AppDroppable";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EmailTemplateForm } from "WorkflowAutomationComponents/ EmailTemplateForm";
import { DelayForm } from "WorkflowAutomationComponents/DelayForm";
import { EmailNotificationStep } from "WorkflowAutomationComponents/EmailNotificationStep";
import { RemovableDroppable } from "WorkflowAutomationComponents/RemovableDroppable";
import { TriggerForm } from "WorkflowAutomationComponents/TriggerForm";
import { Flex } from "antd";
import { Key, useState } from "react";
import { v4 } from "uuid";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const removableId = "removable";

export const CreateEmailNotificationWorkflowPage = () => {
  const [showRemovable, setShowRemovable] = useState<boolean>(false);
  const [steps, setSteps] = useState<AutomationStep[]>([
    {
      id: v4(),
      label: "Trigger",
      fixed: true,
      content: <TriggerForm />,
      icon: <CalendarOutlined />,
    },
    {
      id: v4(),
      label: "Delay",
      content: <DelayForm />,
      icon: <ClockCircleOutlined />,
    },
    {
      id: v4(),
      label: "Email",
      content: <EmailTemplateForm />,
      icon: <MailOutlined />,
    },
  ]);
  const [isDragStart, setIsDragStart] = useState<boolean>(false);

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    if (steps.find((item) => item.id === active.id)?.removable) {
      setShowRemovable(true);
    }
    setIsDragStart(true);
  };

  const handleDragMove = ({ over, active }: DragMoveEvent) => {
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
    setIsDragStart(false);
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAdd = (index: number, key: Key | undefined) => {
    if (!key) return;

    const clonedSteps = [...steps];

    if (key === "email") {
      clonedSteps.splice(index + 1, 0, {
        id: v4(),
        label: "Email",
        content: <EmailTemplateForm />,
        icon: <MailOutlined />,
        removable: true,
      } as AutomationStep);
      setSteps(clonedSteps);
    } else if (key === "delay") {
      clonedSteps.splice(index + 1, 0, {
        id: v4(),
        label: "Delay",
        content: <DelayForm />,
        icon: <ClockCircleOutlined />,
        removable: true,
      } as AutomationStep);
      setSteps(clonedSteps);
    }
  };

  const filteredSteps = steps.filter((step) => !step.hidden);
  return (
    <AppSpace>
      <PageTitle>Create Email Notification Workflow</PageTitle>

      <DndContext
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
        measuring={measuringConfig}
      >
        <AppDroppable id="droppable">
          <AppSurface type="dot" style={{ height: "70vh", padding: "64px 0" }}>
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
                    isDragStart={isDragStart}
                    last={i === filteredSteps.length - 1}
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
              bottom: 0,
              right: 0,
              margin: "16px",
            }}
          />
        )}
      </DndContext>
    </AppSpace>
  );
};
