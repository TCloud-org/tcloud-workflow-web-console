import {
  isMarkActive,
  toggleMark,
} from "DataEntryComponents/AppRichTextEditor";
import { MouseEvent, ReactNode } from "react";
import { useSlate } from "slate-react";
import { Button, Icon } from "./RichTextToolbarComponents";

export const MarkButton = (props: { format: string; icon: ReactNode }) => {
  const { format, icon } = props;
  const editor = useSlate();

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggleMark(editor, format);
  };

  return (
    <Button active={isMarkActive(editor, format)} onMouseDown={handleMouseDown}>
      <Icon>{icon}</Icon>
    </Button>
  );
};
