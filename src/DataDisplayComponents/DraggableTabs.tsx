import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { DraggableTabNode } from "./DraggableTabNode";

export const DraggableTabs = (props: TabsProps) => {
  const [items, setItems] = useState<TabsProps["items"]>([]);
  const [isTabMoving, setIsTabMoving] = useState<boolean>(false);

  useEffect(() => {
    setItems(props.items || []);
  }, [props.items]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragMove = () => {
    setIsTabMoving(true);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setIsTabMoving(false);
    if (active.id !== over?.id) {
      setItems((prev) => {
        if (!prev) return [];
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Tabs
      {...props}
      items={items}
      renderTabBar={(tabBarProps, DefaultTabBar) => (
        <DndContext
          sensors={[sensor]}
          onDragEnd={onDragEnd}
          onDragMove={onDragMove}
        >
          <SortableContext
            items={(items || []).map((i) => i.key)}
            strategy={horizontalListSortingStrategy}
          >
            <DefaultTabBar {...tabBarProps}>
              {(node) => (
                <DraggableTabNode
                  {...node.props}
                  key={node.key}
                  isTabMoving={isTabMoving}
                >
                  {node}
                </DraggableTabNode>
              )}
            </DefaultTabBar>
          </SortableContext>
        </DndContext>
      )}
    />
  );
};
