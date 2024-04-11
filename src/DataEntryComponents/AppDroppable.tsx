import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

export const AppDroppable = (props: { id: string; children?: ReactNode }) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <div ref={setNodeRef}>{props.children}</div>;
};
