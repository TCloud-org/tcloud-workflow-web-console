import { useSortable } from "@dnd-kit/sortable";
import { Tag, TagProps } from "antd";

export interface Item {
  id: number;
  text: string;
  props: TagProps;
}

export interface DraggableTagProps {
  tag: Item;
}

const commonStyle: React.CSSProperties = {
  cursor: "move",
  transition: "unset",
};

export const AppDraggableTag: React.FC<DraggableTagProps> = (props) => {
  const { tag } = props;
  const { listeners, transform, transition, isDragging, setNodeRef } =
    useSortable({ id: tag.id });

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? "unset" : transition,
      }
    : commonStyle;

  return (
    <Tag style={style} {...tag.props} ref={setNodeRef} {...listeners}>
      {tag.text}
    </Tag>
  );
};
