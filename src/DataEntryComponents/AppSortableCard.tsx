import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Drawer } from "antd";
import { CSSProperties, PointerEvent, ReactNode, useState } from "react";

const pointerHoldingDurationThreshold = 200;
export const AppSortableCard = (props: {
  id: UniqueIdentifier;
  children?: ReactNode;
  content?: ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      animateLayoutChanges: () => false,
    });
  const style: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    width: "70%",
    borderColor: "blue",
    cursor: "pointer",
  };

  const [pointerTime, setPointerTime] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setPointerTime(new Date());
    if (listeners) {
      listeners.onPointerDown(event);
    }
  };

  const handlePointerUp = (_: PointerEvent<HTMLDivElement>) => {
    const pointerHoldingDuration = new Date().getTime() - pointerTime.getTime();
    if (pointerHoldingDuration <= pointerHoldingDurationThreshold) {
      setOpen(true);
    }
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {props.children}
      </Card>

      <Drawer
        title="Drawer with extra actions"
        placement="right"
        onClose={onClose}
        width="50vw"
        open={open}
      >
        {props.content}
      </Drawer>
    </>
  );
};
