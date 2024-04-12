import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
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
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppDroppable } from "DataEntryComponents/AppDroppable";
import { AppSortableCard } from "DataEntryComponents/AppSortableCard";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EmailTemplateForm } from "WorkflowAutomationComponents/ EmailTemplateForm";
import { Flex, Typography } from "antd";
import { ReactNode, useState } from "react";

interface AutomationStep {
  id: UniqueIdentifier;
  label?: string;
  fixed?: boolean;
  content?: ReactNode;
}
export const CreateEmailNotificationWorkflowPage = () => {
  const [steps, setSteps] = useState<AutomationStep[]>([
    {
      id: "1",
      label: "Trigger",
      fixed: true,
    },
    {
      id: "2",
      label: "Email Template 1",
      content: <EmailTemplateForm />,
    },
    {
      id: "3",
      label: "Email Template 2",
      content: <EmailTemplateForm />,
    },
  ]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

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

  return (
    <AppSpace>
      <PageTitle>Create Email Notification Workflow</PageTitle>

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <AppDroppable id="droppable">
          <AppSurface type="dot" style={{ height: "70vh", padding: "64px 0" }}>
            <SortableContext
              items={steps}
              strategy={verticalListSortingStrategy}
            >
              <Flex gap="32px" vertical align="center" justify="center">
                {steps.map((step, i) => (
                  <Flex
                    gap="16px"
                    align="center"
                    justify="center"
                    style={{ width: "100%", transition: "1s" }}
                    key={i}
                  >
                    <AppSortableCard
                      key={i}
                      id={step.id}
                      content={step.content}
                      label={step.label}
                    >
                      <Typography.Title level={5} style={{ margin: 0 }}>
                        {step.label}
                      </Typography.Title>
                    </AppSortableCard>
                  </Flex>
                ))}
              </Flex>
            </SortableContext>
          </AppSurface>
        </AppDroppable>
      </DndContext>
    </AppSpace>
  );
};
