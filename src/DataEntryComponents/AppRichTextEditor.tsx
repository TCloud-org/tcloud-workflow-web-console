import { BlockButton } from "SlateRichTextEditorComponents/BlockButton";
import { MarkButton } from "SlateRichTextEditorComponents/MarkButton";
import { RichElement } from "SlateRichTextEditorComponents/RichElement";
import { RichLeaf } from "SlateRichTextEditorComponents/RichLeaf";
import { Toolbar } from "SlateRichTextEditorComponents/RichTextToolbarComponents";
import { theme } from "antd";
import { CustomEditor } from "custom-types";
import isHotkey from "is-hotkey";
import { KeyboardEvent, useCallback, useState } from "react";
import { Descendant, Editor, createEditor } from "slate";
import { withHistory } from "slate-history";
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
    children: [{ text: "" }],
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

export const AppRichTextEditor = (props: {
  value?: string;
  onChange?: (value: string | undefined) => void;
}) => {
  const { token } = theme.useToken();

  const { value = "" } = props;

  const [editor] = useState<CustomEditor>(() =>
    withReact(withHistory(createEditor()))
  );

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

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (typeof props.onChange === "function") {
      props.onChange(event.currentTarget.textContent as string);
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
        <MarkButton format="bold" icon="format_bold" tooltip="Bold" />
        <MarkButton format="italic" icon="format_italic" tooltip="Italic" />
        <MarkButton
          format="underline"
          icon="format_underlined"
          tooltip="Underline"
        />
        <MarkButton format="code" icon="code" tooltip="Code" />
        <BlockButton
          format="heading-one"
          icon="looks_one"
          tooltip="Heading 1"
        />
        <BlockButton
          format="heading-two"
          icon="looks_two"
          tooltip="Heading 2"
        />
        <BlockButton
          format="heading-three"
          icon="looks_3"
          tooltip="Heading 3"
        />
        <BlockButton format="heading-four" icon="looks_4" tooltip="Heading 4" />
        <BlockButton format="heading-five" icon="looks_5" tooltip="Heading 5" />
        <BlockButton format="heading-six" icon="looks_6" tooltip="Heading 6" />
        <BlockButton format="block-quote" icon="format_quote" tooltip="Quote" />
        <BlockButton
          format="numbered-list"
          icon="format_list_numbered"
          tooltip="Numbering"
        />
        <BlockButton
          format="bulleted-list"
          icon="format_list_bulleted"
          tooltip="Bullets"
        />
        <BlockButton
          format="left"
          icon="format_align_left"
          tooltip="Align left"
        />
        <BlockButton
          format="center"
          icon="format_align_center"
          tooltip="Center text"
        />
        <BlockButton
          format="right"
          icon="format_align_right"
          tooltip="Align right"
        />
        <BlockButton
          format="justify"
          icon="format_align_justify"
          tooltip="Justify"
        />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        style={{
          padding: "8px",
          backgroundColor: token.colorFillQuaternary,
          borderRadius: token.borderRadiusSM,
          minHeight: "100px",
        }}
        className="focus"
      />
    </Slate>
  );
};
