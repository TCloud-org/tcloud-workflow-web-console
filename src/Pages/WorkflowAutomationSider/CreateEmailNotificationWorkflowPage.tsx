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
} from "Config/AutomationConfig";
import { WOS_SAVE_EVENT_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppDroppable } from "DataEntryComponents/AppDroppable";
import { AppForm } from "DataEntryComponents/AppForm";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EmailNotificationStep } from "WorkflowAutomationComponents/EmailNotificationStep";
import { RemovableDroppable } from "WorkflowAutomationComponents/RemovableDroppable";
import { Flex, Form, Input } from "antd";
import axios from "axios";
import { Key, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

const removableId = "removable";

export const CreateEmailNotificationWorkflowPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const template = searchParams.get("template") || "blank";
  const [form] = Form.useForm();
  const clientId = useSelector((state: any) => state.client.clientId);

  const [showRemovable, setShowRemovable] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [steps, setSteps] = useState<AutomationStep[]>(
    EmailNotificationTemplates[template]
  );
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
    clonedSteps.splice(index + 1, 0, TemplateComponent[key as string]);
    setSteps(clonedSteps);
  };

  const comparator = (a: [string, any], b: [string, any]): number => {
    const aIndex = steps.findIndex((item) => item.id === a[0]);
    const bIndex = steps.findIndex((item) => item.id === b[0]);
    return aIndex - bIndex;
  };

  const handleCreate = async () => {
    const orders: any[] = Object.entries(formData)
      .sort(comparator)
      .map(([_, v]) => v);
    const params = {
      clientId,
      name: form.getFieldValue("name"),
      steps: orders,
    };
    await axios
      .post(WOS_SAVE_EVENT_WORKFLOW_ENDPOINT, params)
      .then((response) => console.log(response.data))
      .catch((_) => {});
  };

  const filteredSteps = steps.filter((step) => !step.hidden);

  const handleValuesChange = (_: any, values: any) => {
    form.setFieldsValue(values);
  };

  return (
    <AppSpace>
      <PageTitle>Create Email Notification Workflow</PageTitle>

      <AppForm form={form} onValuesChange={handleValuesChange}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>

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
                      isDragStart={isDragStart}
                      last={i === filteredSteps.length - 1}
                      collect={setFormData}
                      formData={formData}
                      index={i}
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
        <Flex justify="flex-end" align="center">
          <Form.Item>
            <AppButton onClick={handleCreate} type="primary">
              Create
            </AppButton>
          </Form.Item>
        </Flex>
      </AppForm>
    </AppSpace>
  );
};
