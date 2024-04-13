import { DeleteOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import { Flex } from "antd";
import { CSSProperties } from "react";

export const RemoveDroppable = () => {
  const { isOver, setNodeRef } = useDroppable({
    id: "remove-droppable",
  });

  const style: CSSProperties = {
    margin: "16px 64px",
    backgroundColor: isOver ? "red" : "gray",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  };

  return (
    <Flex ref={setNodeRef} style={style}>
      <DeleteOutlined style={{ fontSize: "20px" }} />
    </Flex>
  );
};
