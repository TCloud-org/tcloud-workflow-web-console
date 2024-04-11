import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppDroppable } from "DataEntryComponents/AppDroppable";
import { AppSortable } from "DataEntryComponents/AppSortable";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Card, Flex } from "antd";
import { ReactNode, useState } from "react";

interface AutomationStep {
  id: UniqueIdentifier;
  render: (props?: any) => ReactNode;
  fixed?: boolean;
}
export const CreateEmailNotificationWorkflowPage = () => {
  const [steps, setSteps] = useState<AutomationStep[]>([
    {
      id: "1",
      render: (props) => (
        <Card style={{ width: "70%", borderColor: "blue" }} title="Trigger">
          Test1
        </Card>
      ),
      fixed: true,
    },
    {
      id: "2",
      render: (props) => (
        <Card style={{ width: "70%", borderColor: "blue" }} title="Subject">
          Test2
        </Card>
      ),
    },
    {
      id: "3",
      render: (props) => (
        <Card style={{ width: "70%", borderColor: "blue" }} title="Body">
          Test3
        </Card>
      ),
    },
  ]);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setSteps((prev) => {
      const originalPos = prev.findIndex(
        (item) => !item.fixed && item.id === active.id
      );
      const newPos = prev.findIndex(
        (item) => !item.fixed && item.id === over.id
      );

      if (originalPos < 0 || newPos < 0) return prev;

      return arrayMove(prev, originalPos, newPos);
    });
  };

  return (
    <AppSpace>
      <PageTitle>Create Email Notification Workflow</PageTitle>

      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <AppDroppable id="droppable">
          <AppSurface type="dot" style={{ height: "60vh" }}>
            <SortableContext
              items={steps}
              strategy={verticalListSortingStrategy}
            >
              <Flex gap="24px" vertical>
                {steps.map((step, i) => (
                  <AppSortable key={i} id={step.id}>
                    <Flex justify="center" align="center">
                      {step.render()}
                    </Flex>
                  </AppSortable>
                ))}
              </Flex>
            </SortableContext>
          </AppSurface>
        </AppDroppable>
      </DndContext>
    </AppSpace>
  );
};
