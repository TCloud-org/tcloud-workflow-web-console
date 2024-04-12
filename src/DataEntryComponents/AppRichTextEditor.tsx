import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  CodeOutlined,
  ItalicOutlined,
  MenuOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { BlockButton } from "SlateRichTextEditorComponents/BlockButton";
import { MarkButton } from "SlateRichTextEditorComponents/MarkButton";
import { RichElement } from "SlateRichTextEditorComponents/RichElement";
import { RichLeaf } from "SlateRichTextEditorComponents/RichLeaf";
import { Toolbar } from "SlateRichTextEditorComponents/RichTextToolbarComponents";
import { CustomEditor } from "custom-types";
import isHotkey from "is-hotkey";
import { KeyboardEvent, useCallback, useState } from "react";
import { Descendant, Editor, createEditor } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const HOTKEYS: { [key: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const toggleMark = (editor: CustomEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: CustomEditor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? (marks as Record<string, boolean>)[format] === true : false;
};

export const AppRichTextEditor = () => {
  const [editor] = useState<CustomEditor>(() => withReact(createEditor()));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "&") {
      event.preventDefault();
      editor.insertText("and");
    }
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const renderElement = useCallback(
    (props: RenderElementProps) => <RichElement {...props} />,
    []
  );

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <RichLeaf {...props} />,
    []
  );

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Toolbar>
        <MarkButton format="bold" icon={<BoldOutlined />} />
        <MarkButton format="italic" icon={<ItalicOutlined />} />
        <MarkButton format="underline" icon={<UnderlineOutlined />} />
        <MarkButton format="code" icon={<CodeOutlined />} />
        <BlockButton format="heading-one" icon="H1" />
        <BlockButton format="heading-two" icon="H2" />
        <BlockButton format="block-quote" icon={`""`} />
        <BlockButton format="numbered-list" icon={<OrderedListOutlined />} />
        <BlockButton format="bulleted-list" icon={<UnorderedListOutlined />} />
        <BlockButton format="left" icon={<AlignLeftOutlined />} />
        <BlockButton format="center" icon={<AlignCenterOutlined />} />
        <BlockButton format="right" icon={<AlignRightOutlined />} />
        <BlockButton format="justify" icon={<MenuOutlined />} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onKeyDown={handleKeyDown}
        style={{ padding: "0px 8px" }}
      />
    </Slate>
  );
};
