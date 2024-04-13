import {
  isMarkActive,
  toggleMark,
} from "DataEntryComponents/AppRichTextEditor";
import { MouseEvent, ReactNode } from "react";
import { useSlate } from "slate-react";
import { Button, Icon } from "./RichTextToolbarComponents";
import { Tooltip } from "antd";

export const MarkButton = (props: {
  format: string;
  icon: ReactNode;
  tooltip?: string;
}) => {
  const { format, icon } = props;
  const editor = useSlate();

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    toggleMark(editor, format);
  };

  return (
    <Tooltip title={props.tooltip}>
      <Button
        active={isMarkActive(editor, format)}
        onMouseDown={handleMouseDown}
      >
        <Icon>{icon}</Icon>
      </Button>
    </Tooltip>
  );
};
