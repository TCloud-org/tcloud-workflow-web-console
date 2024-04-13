import React, { CSSProperties, ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";
import { theme } from "antd";

export const AppDroppable = (props: {
  id: string;
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  const { token } = theme.useToken();
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style: CSSProperties = {
    backgroundColor: isOver ? token.colorError : undefined,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div ref={setNodeRef} style={{ ...props.style, ...style }}>
      {props.children}
    </div>
  );
};
