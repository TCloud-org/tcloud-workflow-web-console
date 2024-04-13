import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { useDroppable } from "@dnd-kit/core";
import { Flex, theme } from "antd";
import { CSSProperties, ReactNode } from "react";

export const RemovableDroppable = (props: {
  id: string;
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  const { token } = theme.useToken();
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style: CSSProperties = {
    transition: "0.2s",
    backgroundColor: isOver ? token.colorError : token.colorFillQuaternary,
    borderRadius: 999,
    padding: "16px",
  };

  return (
    <Flex ref={setNodeRef} style={{ ...props.style, ...style }}>
      <Flex justify="center" style={{ fontSize: "20px" }}>
        {isOver ? (
          <DeleteFilled style={{ color: token.colorWhite }} />
        ) : (
          <DeleteOutlined />
        )}
      </Flex>
    </Flex>
  );
};
