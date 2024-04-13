import { UniqueIdentifier } from "@dnd-kit/core";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Drawer, Input, Typography, theme } from "antd";
import {
  CSSProperties,
  ChangeEvent,
  Dispatch,
  PointerEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputRef } from "./AppEditableCell";
import { AutomationStep, borderColor } from "Config/AutomationConfig";

const pointerHoldingDurationThreshold = 200;

const animateLayoutChanges = (args: any) => {
  const { isSorting, wasSorting, wasDragging } = args;

  if (isSorting || wasSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
};

export const AppSortableCard = (props: {
  id: UniqueIdentifier;
  children?: ReactNode;
  content?: ReactNode;
  label?: string;
  setStep?: Dispatch<SetStateAction<AutomationStep>>;
}) => {
  const { token } = theme.useToken();

  const { setStep = () => {} } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      animateLayoutChanges,
    });
  const style: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    width: 400,
    cursor: "pointer",
    zIndex: 1,
    position: "relative",
    boxShadow: token.boxShadowSecondary,
    border: "1px solid",
    borderColor: "transparent",
  };
  const borderStyle: CSSProperties = {
    borderColor: borderColor,
  };
  const inputRef = useRef<InputRef>(null);

  const [pointerTime, setPointerTime] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.label || "");

  useEffect(() => {
    setTitle(props.label || "");
  }, [props.label]);

  useEffect(() => {
    if (titleEditing && inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, [titleEditing]);

  const onClose = () => {
    setOpen(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setPointerTime(new Date());
    if (listeners) {
      listeners.onPointerDown(event);
    }
  };

  const handlePointerUp = (_: PointerEvent<HTMLDivElement>) => {
    const pointerHoldingDuration = new Date().getTime() - pointerTime.getTime();
    if (pointerHoldingDuration <= pointerHoldingDurationThreshold) {
      setOpen(true);
    }
  };

  const handleDrawerTitleClick = () => {
    setTitleEditing(true);
  };

  const handleTitleEditEnter = () => {
    setTitleEditing((prev) => !prev);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setStep((prev) => ({ ...prev, label: e.target.value }));
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        bordered={false}
        style={{ ...style, ...(open && borderStyle) }}
        {...listeners}
        {...attributes}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {props.children}
      </Card>

      <Drawer
        title={
          titleEditing ? (
            <Input
              value={title}
              onChange={handleTitleChange}
              ref={inputRef}
              onPressEnter={handleTitleEditEnter}
              onBlur={handleTitleEditEnter}
              style={{
                margin: 0,
                padding: "4px 11px",
                fontSize: "14px",
                fontWeight: "normal",
              }}
            />
          ) : (
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
              className="editable"
              onClick={handleDrawerTitleClick}
            >
              {title}
            </Typography.Title>
          )
        }
        placement="right"
        onClose={onClose}
        width="50vw"
        open={open}
      >
        {props.content}
      </Drawer>
    </>
  );
};
