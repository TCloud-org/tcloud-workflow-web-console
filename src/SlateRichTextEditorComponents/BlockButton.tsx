import { CustomEditor, CustomElement } from "custom-types";
import { MouseEvent, ReactNode } from "react";
import { Editor, Element, Transforms } from "slate";
import { useSlate } from "slate-react";
import { Button, Icon } from "./RichTextToolbarComponents";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

export const BlockButton = (props: { format: string; icon: ReactNode }) => {
  const { format, icon } = props;

  const editor = useSlate();

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggleBlock(editor, format);
  };

  const toggleBlock = (editor: CustomEditor, format: string) => {
    const isActive = isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
    let newProperties: Partial<Element>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? "left" : (format as CanvasTextAlign),
      };
    } else {
      newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : (format as any),
      };
    }
    Transforms.setNodes<Element>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block as any);
    }
  };

  const isBlockActive = (
    editor: CustomEditor,
    format: string,
    blockType = "type"
  ) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[blockType as keyof CustomElement] === format,
      })
    );

    return !!match;
  };

  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
      )}
      onMouseDown={handleMouseDown}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
